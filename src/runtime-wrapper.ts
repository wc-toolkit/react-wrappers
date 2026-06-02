import {
  getComponentByClassName,
  getComponentByTagName,
  getComponentPublicProperties,
  toCamelCase,
  toPascalCase,
  type Component,
} from "@wc-toolkit/cem-utilities";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import type {
  RuntimeElementConstructor,
  RuntimeEventDescriptor,
  RuntimeEventMap,
  RuntimeInferredProps,
  RuntimeManifest,
  RuntimeManifestAttribute,
  RuntimeManifestClassNames,
  RuntimePropMap,
  RuntimeWrapperOptions,
  RuntimeWrapperProps,
  RuntimeWrapperReturn,
  RuntimeWrapperSetupReturn,
} from "./types";

const DEFAULT_ATTRIBUTE_MAP = {
  className: "class",
  htmlFor: "for",
} as const;

const RESERVED_REACT_PROPERTIES = new Set([
  "children",
  "localName",
  "ref",
  "style",
  "className",
]);

const PROTOTYPE_STOP_SET = (() => {
  const stopSet = new Set<object>([Object.prototype]);

  if (typeof EventTarget !== "undefined") {
    stopSet.add(EventTarget.prototype);
  }

  if (typeof Node !== "undefined") {
    stopSet.add(Node.prototype);
  }

  if (typeof Element !== "undefined") {
    stopSet.add(Element.prototype);
  }

  if (typeof HTMLElement !== "undefined") {
    stopSet.add(HTMLElement.prototype);
  }

  return stopSet;
})();

const KNOWN_HTML_PROP_NAMES = new Set([
  "id",
  "style",
  "slot",
  "part",
  "role",
  "title",
  "tabIndex",
  "lang",
  "dir",
  "hidden",
  "draggable",
  "accessKey",
  "spellCheck",
  "translate",
  "contentEditable",
  "inputMode",
  "enterKeyHint",
  "nonce",
  "className",
  "htmlFor",
  "dangerouslySetInnerHTML",
  "suppressHydrationWarning",
]);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type PropertyMap = Record<string, string>;
type PropertyEntries = ReadonlyArray<readonly [string, string]>;
type EventEntries = ReadonlyArray<readonly [string, string]>;

type EventHandler = ((event: Event) => void) & {
  cancel?: () => void;
};

type RuntimeManifestComponentMetadata = {
  displayName: string;
  attributeMap: PropertyMap;
  propertyMap: PropertyMap;
  eventMap: RuntimeEventMap;
  booleanAttributes: string[];
};

type SetupRuntimeOptions<TManifest extends RuntimeManifest> =
  RuntimeWrapperOptions<
    RuntimeEventMap,
    readonly string[],
    RuntimeManifestClassNames<TManifest>
  >;

const classPropertyMapCache = new WeakMap<RuntimeElementConstructor, PropertyMap>();

function normalizePropMap(source?: RuntimePropMap): PropertyMap {
  if (!source) {
    return {};
  }

  if (Array.isArray(source)) {
    return Object.fromEntries(source.map((name) => [name, name]));
  }

  return Object.fromEntries(Object.entries(source));
}

function mergePropMaps(...maps: Array<PropertyMap | undefined>) {
  return Object.assign({}, ...maps);
}

function mergeBooleanAttributes(...values: Array<readonly string[] | undefined>) {
  return [...new Set(values.flatMap((value) => value || []))];
}

function resolveEventName(descriptor: RuntimeEventDescriptor | undefined) {
  if (typeof descriptor === "string") {
    return descriptor;
  }

  if (descriptor && typeof descriptor.name === "string") {
    return descriptor.name;
  }

  return undefined;
}

function normalizeEventEntries(eventMap?: RuntimeEventMap): EventEntries {
  if (!eventMap) {
    return [];
  }

  return Object.entries(eventMap).flatMap(([propName, descriptor]) => {
    const eventName = resolveEventName(descriptor);
    return eventName ? ([[propName, eventName]] as const) : [];
  });
}

function isKnownHtmlPropName(propName: string) {
  return (
    KNOWN_HTML_PROP_NAMES.has(propName) ||
    propName.startsWith("data-") ||
    propName.startsWith("aria-") ||
    /^on[A-Z]/.test(propName)
  );
}

function isSerializableAttributeValue(value: unknown) {
  if (value == null) {
    return true;
  }

  const valueType = typeof value;
  return (
    valueType === "string" ||
    valueType === "number" ||
    valueType === "bigint" ||
    valueType === "boolean"
  );
}

function useRuntimeProperties<TElement extends HTMLElement>(
  targetRef: React.RefObject<TElement | null>,
  props: Record<string, unknown>,
  propertyEntries: PropertyEntries,
) {
  useEffect(() => {
    const element = targetRef.current;
    if (!element) {
      return;
    }

    propertyEntries.forEach(([propName, propertyName]) => {
      const value = props[propName];

      if (
        value === undefined ||
        element[propertyName as keyof TElement] === value
      ) {
        return;
      }

      (element as Record<string, unknown>)[propertyName] = value;
    });
  }, [propertyEntries, props, targetRef]);
}

function useRuntimeEvents<TElement extends HTMLElement>(
  targetRef: React.RefObject<TElement | null>,
  props: Record<string, unknown>,
  eventEntries: EventEntries,
) {
  const latestProps = useRef(props);
  latestProps.current = props;

  useIsomorphicLayoutEffect(() => {
    const element = targetRef.current;
    if (!element) {
      return;
    }

    const listeners = eventEntries.map(([propName, eventName]) => {
      const listener: EventListener = (event) => {
        const handler = latestProps.current[propName] as EventHandler | undefined;

        if (handler) {
          handler(event);
        }
      };

      element.addEventListener(eventName, listener);
      return { listener, eventName, propName };
    });

    return () => {
      listeners.forEach(({ eventName, listener, propName }) => {
        const handler = latestProps.current[propName] as EventHandler | undefined;

        if (handler?.cancel) {
          handler.cancel();
        }

        element.removeEventListener(eventName, listener);
      });
    };
  }, [eventEntries, targetRef]);
}

function toDisplayName(tagName: string) {
  return tagName
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function getAttributePropName(attribute: RuntimeManifestAttribute) {
  if (attribute.name === "class") {
    return "className";
  }

  if (attribute.name === "for") {
    return "htmlFor";
  }

  return attribute.fieldName || toCamelCase(attribute.name);
}

function getBooleanAttributeNames(
  attributes: readonly RuntimeManifestAttribute[] | undefined,
) {
  return (
    attributes
      ?.filter((attribute) => attribute.type?.text?.includes("boolean"))
      .map(getAttributePropName) || []
  );
}

function getManifestMetadata(
  component: Pick<Component, "name" | "attributes" | "events" | "members">,
): RuntimeManifestComponentMetadata {
  const attributeMap = Object.fromEntries(
    (component.attributes || []).map((attribute) => [
      getAttributePropName(attribute),
      attribute.name,
    ]),
  );
  const propertyMap = Object.fromEntries(
    getComponentPublicProperties(component as Component)
      .filter((member) => !Object.hasOwn(attributeMap, member.name!))
      .map((member) => [member.name!, member.name!]),
  );
  const eventMap = Object.fromEntries(
    (component.events || []).map((event) => [
      `on${toPascalCase(event.name)}`,
      event.name,
    ]),
  );

  return {
    displayName: component.name,
    attributeMap,
    propertyMap,
    eventMap,
    booleanAttributes: getBooleanAttributeNames(component.attributes),
  };
}

function isAssignablePropertyDescriptor(descriptor?: PropertyDescriptor) {
  if (!descriptor) {
    return true;
  }

  if ("value" in descriptor) {
    if (typeof descriptor.value === "function") {
      return false;
    }

    return descriptor.writable !== false;
  }

  if (descriptor.get && !descriptor.set) {
    return false;
  }

  return true;
}

function getClassPropertyMap(
  elementClass?: RuntimeElementConstructor,
): PropertyMap {
  if (!elementClass) {
    return {};
  }

  const cached = classPropertyMapCache.get(elementClass);
  if (cached) {
    return cached;
  }

  const propertyMap: PropertyMap = {};
  let prototype = elementClass.prototype as object | null;

  while (prototype && !PROTOTYPE_STOP_SET.has(prototype)) {
    Object.getOwnPropertyNames(prototype).forEach((propertyName) => {
      if (
        propertyName === "constructor" ||
        RESERVED_REACT_PROPERTIES.has(propertyName)
      ) {
        return;
      }

      const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
      if (!isAssignablePropertyDescriptor(descriptor)) {
        return;
      }

      propertyMap[propertyName] = propertyName;
    });

    prototype = Object.getPrototypeOf(prototype) as object | null;
  }

  classPropertyMapCache.set(elementClass, propertyMap);
  return propertyMap;
}

function isRuntimeElementConstructor(
  value: RuntimeElementConstructor | RuntimeWrapperOptions | undefined,
): value is RuntimeElementConstructor {
  return typeof value === "function";
}

function createRuntimeComponent<
  TElement extends HTMLElement,
  TProps extends object,
>(
  tagName: string,
  options: {
    attributeMap?: PropertyMap;
    propertyMap?: PropertyMap;
    eventMap?: RuntimeEventMap;
    booleanAttributes?: readonly string[];
    displayName: string;
    strict?: boolean;
  },
): RuntimeWrapperReturn<TElement, TProps> {
  const attributeMap: Record<string, string> = {
    ...DEFAULT_ATTRIBUTE_MAP,
    ...(options.attributeMap || {}),
  };
  const propertyMap = options.propertyMap || {};
  const propertyEntries = Object.entries(propertyMap) as PropertyEntries;
  const eventEntries = normalizeEventEntries(options.eventMap);
  const strict = options.strict !== false;

  const booleanAttributes = new Set(options.booleanAttributes || []);
  const attributeProps = new Set(Object.keys(attributeMap));
  const eventProps = new Set(eventEntries.map(([propName]) => propName));
  const propertyProps = new Set(propertyEntries.map(([propName]) => propName));

  const WrappedComponent = forwardRef<TElement, RuntimeWrapperProps<TElement, TProps>>(
    (props, forwardedRef) => {
      const localRef = useRef<TElement | null>(null);
      const { children, ...restProps } = props;
      const propsRecord = props as Record<string, unknown>;
      const restPropsRecord = restProps as Record<string, unknown>;

      useRuntimeProperties(localRef, propsRecord, propertyEntries);
      useRuntimeEvents(localRef, propsRecord, eventEntries);

      const setRef = useCallback(
        (node: TElement | null) => {
          localRef.current = node;

          if (!forwardedRef) {
            return;
          }

          if (typeof forwardedRef === "function") {
            forwardedRef(node);
            return;
          }

          forwardedRef.current = node;
        },
        [forwardedRef],
      );

      const elementProps: Record<string, unknown> = { ref: setRef };

      Object.entries(restPropsRecord).forEach(([propName, value]) => {
        if (eventProps.has(propName) || propertyProps.has(propName)) {
          return;
        }

        const isKnownHtmlProp = isKnownHtmlPropName(propName);
        const isMappedAttribute =
          attributeProps.has(propName) || booleanAttributes.has(propName);

        if (strict && !isMappedAttribute && !isKnownHtmlProp) {
          return;
        }

        const attributeName = attributeMap[propName] || propName;

        if (booleanAttributes.has(propName)) {
          elementProps[attributeName] = value ? true : undefined;
          return;
        }

        if (!isKnownHtmlProp && !isSerializableAttributeValue(value)) {
          return;
        }

        if (!strict && !isMappedAttribute && !isKnownHtmlProp) {
          elementProps[attributeName] =
            value === undefined ? undefined : String(value);
          return;
        }

        elementProps[attributeName] = value;
      });

      return React.createElement(tagName, elementProps, children);
    },
  ) as RuntimeWrapperReturn<TElement, TProps>;

  WrappedComponent.displayName = options.displayName;

  return WrappedComponent;
}

function resolveTopLevelRuntimeOptions(
  tagName: string,
  elementClassOrOptions?: RuntimeElementConstructor | RuntimeWrapperOptions,
  options?: RuntimeWrapperOptions,
) {
  const elementClass = isRuntimeElementConstructor(elementClassOrOptions)
    ? elementClassOrOptions
    : undefined;
  const runtimeOptions = isRuntimeElementConstructor(elementClassOrOptions)
    ? (options ?? {})
    : (elementClassOrOptions ?? {});

  return {
    elementClass,
    runtimeOptions,
    displayName:
      runtimeOptions.displayName ||
      elementClass?.name ||
      toDisplayName(tagName),
  };
}

function getManifestMetadataForTag(
  manifest: RuntimeManifest,
  tagName: string,
  extendsName?: string,
) {
  const component = extendsName
    ? getComponentByClassName<Component>(manifest, extendsName)
    : getComponentByTagName<Component>(manifest, tagName);

  if (!component) {
    if (extendsName) {
      throw new Error(
        `Runtime wrapper setup could not find a manifest component named "${extendsName}".`,
      );
    }

    return undefined;
  }

  return getManifestMetadata(component);
}

export function wrapComponent<
  TClass extends RuntimeElementConstructor,
  TEvents extends RuntimeEventMap = Record<never, never>,
  TBooleanAttributes extends readonly string[] = readonly [],
>(
  tagName: string,
  elementClass: TClass,
  options?: RuntimeWrapperOptions<TEvents, TBooleanAttributes>,
): RuntimeWrapperReturn<
  InstanceType<TClass>,
  RuntimeInferredProps<InstanceType<TClass>, TEvents, TBooleanAttributes>
>;

export function wrapComponent<
  TElement extends HTMLElement = HTMLElement,
  TProps extends object = Record<string, never>,
  TEvents extends RuntimeEventMap = Record<never, never>,
  TBooleanAttributes extends readonly string[] = readonly [],
>(
  tagName: string,
  options?: RuntimeWrapperOptions<TEvents, TBooleanAttributes>,
): RuntimeWrapperReturn<
  TElement,
  TProps & RuntimeInferredProps<TElement, TEvents, TBooleanAttributes>
>;

export function wrapComponent<
  TElement extends HTMLElement = HTMLElement,
  TProps extends object = Record<string, never>,
>(
  tagName: string,
  elementClassOrOptions?: RuntimeElementConstructor | RuntimeWrapperOptions,
  options?: RuntimeWrapperOptions,
): RuntimeWrapperReturn<TElement, TProps> {
  const resolved = resolveTopLevelRuntimeOptions(
    tagName,
    elementClassOrOptions,
    options,
  );

  return createRuntimeComponent<TElement, TProps>(tagName, {
    attributeMap: normalizePropMap(resolved.runtimeOptions.attributes),
    propertyMap: mergePropMaps(
      getClassPropertyMap(resolved.elementClass),
      normalizePropMap(resolved.runtimeOptions.properties),
    ),
    eventMap: resolved.runtimeOptions.events || {},
    booleanAttributes: resolved.runtimeOptions.booleanAttributes,
    displayName: resolved.displayName,
    strict: resolved.runtimeOptions.strict,
  });
}

export function wrapperSetup<const TManifest extends RuntimeManifest>(
  manifest: TManifest,
): RuntimeWrapperSetupReturn<TManifest> {
  function setupWrapComponent<
    TClass extends RuntimeElementConstructor,
    TEvents extends RuntimeEventMap = Record<never, never>,
    TBooleanAttributes extends readonly string[] = readonly [],
  >(
    tagName: string,
    elementClass: TClass,
    options?: RuntimeWrapperOptions<
      TEvents,
      TBooleanAttributes,
      RuntimeManifestClassNames<TManifest>
    >,
  ): RuntimeWrapperReturn<
    InstanceType<TClass>,
    RuntimeInferredProps<InstanceType<TClass>, TEvents, TBooleanAttributes>
  >;

  function setupWrapComponent<
    TElement extends HTMLElement = HTMLElement,
    TProps extends object = Record<string, never>,
    TEvents extends RuntimeEventMap = Record<never, never>,
    TBooleanAttributes extends readonly string[] = readonly [],
  >(
    tagName: string,
    options?: RuntimeWrapperOptions<
      TEvents,
      TBooleanAttributes,
      RuntimeManifestClassNames<TManifest>
    >,
  ): RuntimeWrapperReturn<
    TElement,
    TProps & RuntimeInferredProps<TElement, TEvents, TBooleanAttributes>
  >;

  function setupWrapComponent<
    TElement extends HTMLElement = HTMLElement,
    TProps extends object = Record<string, never>,
  >(
    tagName: string,
    elementClassOrOptions?: RuntimeElementConstructor | SetupRuntimeOptions<TManifest>,
    options?: SetupRuntimeOptions<TManifest>,
  ): RuntimeWrapperReturn<TElement, TProps> {
    const resolved = resolveTopLevelRuntimeOptions(
      tagName,
      elementClassOrOptions as RuntimeElementConstructor | RuntimeWrapperOptions,
      options,
    );
    const manifestMetadata = getManifestMetadataForTag(
      manifest,
      tagName,
      resolved.runtimeOptions.extends,
    );

    return createRuntimeComponent<TElement, TProps>(tagName, {
      attributeMap: mergePropMaps(
        manifestMetadata?.attributeMap,
        normalizePropMap(resolved.runtimeOptions.attributes),
      ),
      propertyMap: mergePropMaps(
        manifestMetadata?.propertyMap,
        getClassPropertyMap(resolved.elementClass),
        normalizePropMap(resolved.runtimeOptions.properties),
      ),
      eventMap: {
        ...(manifestMetadata?.eventMap || {}),
        ...(resolved.runtimeOptions.events || {}),
      },
      booleanAttributes: mergeBooleanAttributes(
        manifestMetadata?.booleanAttributes,
        resolved.runtimeOptions.booleanAttributes,
      ),
      displayName:
        resolved.runtimeOptions.displayName ||
        manifestMetadata?.displayName ||
        resolved.displayName,
      strict: resolved.runtimeOptions.strict,
    });
  }

  return setupWrapComponent as RuntimeWrapperSetupReturn<TManifest>;
}
