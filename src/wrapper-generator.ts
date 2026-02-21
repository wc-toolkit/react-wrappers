import { BASE_PROPS, MAPPED_PROPS, NON_ATTR_BASE_PROPS } from "./global.js";
import {
  RESERVED_WORDS,
  createEventName,
  getModulePath,
  getPackageJson,
  saveReactUtils,
  saveScopeProvider,
} from "./react-utils.js";
import { Logger } from "./logger";
import {
  getAllComponents,
  toCamelCase,
  getCustomEventDetailTypes,
  getComponentDetailsTemplate,
  toPascalCase,
} from "@wc-toolkit/cem-utilities";
import { createOutDir, has, saveFile } from "./utils.js";
import type { Attribute, ClassField, Package } from "custom-elements-manifest";
import type {
  EventName,
  MappedAttribute,
  ComponentAttributes,
  ReactWrapperOptions,
  GlobalEvent,
} from "./types.js";
import type { Component } from "@wc-toolkit/cem-utilities";

const packageJson = getPackageJson();
let config: ReactWrapperOptions = {};
let globalEvents: GlobalEvent[] = [];
let log: Logger;

export function generateReactWrappers(
  customElementsManifest: unknown,
  options: ReactWrapperOptions,
) {
  log = new Logger(options.debug);
  if (options.skip) {
    log.yellow("[react-wrappers] - Skipped");
    return;
  }
  log.default("[react-wrappers] - Generating wrappers...");

  updateConfig(options);
  const components = getAllComponents(
    customElementsManifest as Package,
    config.exclude,
  );
  createOutDir(config.outdir!);
  saveReactUtils(config.outdir!, config.ssrSafe);
  if (config.scopedTags) {
    saveScopeProvider(config.outdir!, config.ssrSafe);
  }

  components.forEach((component) => {
    const events = getEventNames(component);
    const { booleanAttributes, attributes } = getAttributes(component);
    const properties = getProperties(component, attributes, booleanAttributes);
    const componentModulePath = getModulePath(
      config.modulePath,
      component,
      config.outdir!,
      packageJson,
    );

    generateReactWrapper(
      component,
      events,
      booleanAttributes,
      attributes,
      componentModulePath,
      properties,
    );

    generateTypeDefinition(
      component,
      events,
      booleanAttributes,
      attributes,
      componentModulePath,
      properties,
    );
  });

  generateBarrelFiles(components, config.outdir!);
  log.default(`[react-wrappers] - Generated wrappers in "${config.outdir}".`);
}

function updateConfig(options: ReactWrapperOptions) {
  config = {
    outdir: "./react",
    exclude: [],
    attributeMapping: {},
    ...options,
  };

  globalEvents = options.globalEvents || [];
}

function getFormattedComponentName(component: Component) {
  return (
    config.componentNameFormatter?.(component.tagName!, component.name) ||
    component.name
  );
}

function generateReactWrapper(
  component: Component,
  events: EventName[],
  booleanAttributes: Attribute[],
  attributes: Attribute[],
  componentModulePath: string,
  properties?: ClassField[],
) {
  const result = getReactComponentTemplate(
    component,
    events,
    booleanAttributes,
    attributes,
    componentModulePath,
    properties,
  );

  saveFile(
    config.outdir!,
    `${getFormattedComponentName(component)}.js`,
    result,
  );
}

function generateTypeDefinition(
  component: Component,
  events: EventName[],
  booleanAttributes: Attribute[],
  attributes: Attribute[],
  componentModulePath: string,
  properties?: ClassField[],
) {
  const result = getTypeDefinitionTemplate(
    component,
    events,
    booleanAttributes,
    attributes,
    componentModulePath,
    properties,
  );

  saveFile(
    config.outdir!,
    `${getFormattedComponentName(component)}.d.ts`,
    result,
  );
}

function generateBarrelFiles(components: Component[], outdir: string) {
  saveFile(outdir, "index.js", getManifestContentTemplate(components));
  saveFile(outdir, "index.d.ts", getManifestContentTemplate(components));
}

function getProperties(
  component: Component,
  attributes: MappedAttribute[],
  booleanAttributes: MappedAttribute[],
) {
  const attributeFieldNames = attributes.map((attr) => attr.fieldName);
  return component?.members?.filter(
    (member) =>
      member.kind === "field" &&
      !member.static &&
      member.privacy !== "private" &&
      member.privacy !== "protected" &&
      !attributeFieldNames.includes(member.name) &&
      (member.description || member.deprecated) &&
      !booleanAttributes.find(
        (x) => (x.fieldName || x.propName) === member.name,
      ) &&
      !attributes.find((x) => (x.fieldName || x.propName) === member.name),
  ) as ClassField[];
}

function getEventNames(component: Component): EventName[] {
  return (
    component?.events
      ?.filter((e) => e.name)
      ?.map((event) => {
        return {
          name: event.name,
          reactName: createEventName(event),
          description: event.description,
          type: event.type?.text,
        };
      }) || []
  );
}

function getAttributes(component: Component): ComponentAttributes {
  const result: {
    attributes: MappedAttribute[];
    booleanAttributes: MappedAttribute[];
  } = {
    attributes: [],
    booleanAttributes: [],
  };

  component?.attributes?.forEach((attr) => {
    if (!attr?.name) {
      return;
    }

    /** Handle reserved keyword attributes */
    if (RESERVED_WORDS.includes(attr?.name)) {
      /** If we have a user-specified mapping, rename */
      if (attr.name in config.attributeMapping!) {
        const attribute = getMappedAttribute(attr);
        addAttribute(attribute, result);
        return;
      }
      throwKeywordException(attr, component);
    }

    addAttribute(attr as MappedAttribute, result);
  });

  addGlobalAttributes(result.attributes);

  return result;
}

function addGlobalAttributes(attributes: MappedAttribute[]) {
  MAPPED_PROPS.forEach((baseAttr: MappedAttribute) => {
    if (!attributes.find((x) => x.name === baseAttr.name)) {
      attributes.push(baseAttr);
    }
  });
}

function throwKeywordException(attr: Attribute, component: Component) {
  throw new Error(
    `Attribute \`${attr.name}\` in custom element \`${component.name}\` is a reserved keyword and cannot be used. Please provide an \`attributeMapping\` in the plugin options to rename the JavaScript variable that gets passed to the attribute.`,
  );
}

function addAttribute(
  attribute: MappedAttribute,
  componentAttributes: ComponentAttributes,
) {
  const existingAttr = componentAttributes.attributes.find(
    (x) => x.name === attribute.name,
  );
  const existingBool = componentAttributes.booleanAttributes.find(
    (x) => x.name === attribute.name,
  );

  if (existingAttr || existingBool) {
    return;
  }

  attribute.propName = toCamelCase(attribute.name);

  if (attribute?.type?.text.includes("boolean")) {
    componentAttributes.booleanAttributes.push(attribute);
  } else {
    componentAttributes.attributes.push(attribute);
  }
}

function getMappedAttribute(attr: Attribute): MappedAttribute {
  return {
    ...attr,
    originalName: attr.name,
    name: config.attributeMapping![attr.name],
  };
}

function getEventTemplates(eventNames: EventName[]) {
  return (
    eventNames.map(
      (event) =>
        `useEventListener(ref, '${event.name}', props.${event.reactName});`,
    ) || []
  );
}

function getBooleanAttributeTemplates(booleanAttributes: MappedAttribute[]) {
  return (
    booleanAttributes?.map(
      (attr) => `'${attr.name}': ${attr.fieldName} ? true : undefined`,
    ) || []
  );
}

function getAttributeTemplates(attributes: MappedAttribute[]) {
  const excludedProps = ["ref", "children", "key", "style", "className"];
  return (
    attributes
      ?.filter((x) => !excludedProps.includes(x.name))
      .map(
        (attr) =>
          `'${attr.originalName || attr?.name}': ${
            attr.fieldName
          } ${attr.name.includes("-") ? `?? props['${attr.name}']` : ""}`,
      ) || []
  );
}

function getPropTemplates(properties?: ClassField[]) {
  return properties?.map(
    (member) => `useProperties(ref, '${member.name}', ${getMappedPropName(member.name)});`,
  );
}

function getMappedPropName(propName: string) {
  const mappedProp = MAPPED_PROPS.find((x) => x.name === propName);
  return mappedProp ? mappedProp.propName : propName;
}

function getReactComponentTemplate(
  component: Component,
  events: EventName[],
  booleanAttributes: MappedAttribute[],
  attributes: MappedAttribute[],
  modulePath: string,
  properties?: ClassField[],
) {
  const eventTemplates = getEventTemplates(events);
  const booleanAttrTemplates = getBooleanAttributeTemplates(booleanAttributes);
  const attrTemplates = getAttributeTemplates(attributes);
  const propTemplates = getPropTemplates(properties);
  const unusedProps = getUnusedProps(attributes, booleanAttributes, properties);

  return `
    ${config.ssrSafe ? '"use client"' : ""}
    import React, { forwardRef ${
      config.ssrSafe ? ", useEffect" : ""
    }, useRef ${config.scopedTags ? ", useContext" : ""} } from "react";
    ${!config.ssrSafe ? `import '${modulePath}';` : ""}
    import {
      ${has(eventTemplates) ? "useEventListener," : ""}
      ${has(propTemplates) ? "useProperties," : ""}
      createForwardedRefHandler
    } from './react-utils.js';
    ${
      config.scopedTags
        ? 'import { ScopeContext } from "./ScopeProvider.js";'
        : ""
    }

    export const ${getFormattedComponentName(component)} = forwardRef((props, forwardedRef) => {
      const ref = useRef(null);
      ${
        has(unusedProps)
          ? `const { ${unusedProps.join(", ")}, ...restProps } = props;`
          : ""
      }
      ${config.scopedTags ? "const scope = useContext(ScopeContext);" : ""}

      ${
        config.ssrSafe
          ? `
      /** Waits for the client before loading the custom element */
      useEffect(() => {
        import('${modulePath}');
      }, []);
      `
          : ""
      }

      ${has(eventTemplates) ? "/** Event listeners - run once */" : ""}
      ${eventTemplates?.join("") || ""}

      ${
        has(propTemplates)
          ? "/** Properties - run whenever a property has changed */"
          : ""
      }
      ${propTemplates?.join("") || ""}

      return React.createElement(
        ${getTagName(component)},
        {
          ref: createForwardedRefHandler(ref, forwardedRef),
          ${has(unusedProps) ? "...restProps" : "...props"},
          ${[...attrTemplates, ...booleanAttrTemplates].join(",")},
          style: {...props.style},
          ${globalEvents.map((x) => `${x.event}: props.${x.event}`).join(", ")}
        },
        props.children
      );
     });
  `;
}

function getTypeDefinitionTemplate(
  component: Component,
  events: EventName[],
  booleanAttributes: Attribute[],
  attributes: Attribute[],
  modulePath: string,
  properties?: ClassField[],
) {
  const componentName = getFormattedComponentName(component);
  const props = getPropsInterface(
    componentName,
    booleanAttributes,
    attributes,
    events,
    properties,
  );
  const eventTypes = getCustomEventDetailTypes(component);
  const formattedComponentName = getFormattedComponentName(component);
  return `
    import React from "react";
    import {
      ${config.defaultExport ? "default" : component.name} as ${
        formattedComponentName
      }Element
      ${eventTypes?.length ? `, ${eventTypes}` : ""}
    } from '${modulePath}';

    ${config.stronglyTypedEvents ? getStronglyTypedEvents(component, formattedComponentName) : ""}

    export type {
      ${formattedComponentName}Element
      ${eventTypes?.length ? `, ${eventTypes}` : ""}
    };

    export interface ${formattedComponentName}Props ${getExtendedProps()} {
      ${props}
    }

    ${getCssProperties(component)}

    /**
     ${getComponentDetailsTemplate(component, config, true)}
     */
     export const ${formattedComponentName}: React.ForwardRefExoticComponent<${
       formattedComponentName
     }Props>;
  `;
}

function getCssProperties(component: Component): string {
  if (!component.cssProperties?.length) {
    return "";
  }
  return `
  declare module 'react' {
    interface CSSProperties {
      ${
        component.cssProperties
          ?.map(
            (property) => `
        /** ${property.description} */
        '${property.name}'?: string | number;`,
          )
          .join("") || ""
      }
    }
  }
`;
}

function getEventTypes(
  component: Component,
): Array<{ name: string; type: string; isClassExtension: boolean }> {
  const eventTypes = component?.events?.map((event) => ({
    name: event.name,
    type: event?.type?.text,
  }));

  if (!eventTypes) {
    return [];
  }

  return eventTypes
    .filter(
      (eventType) =>
        eventType.type &&
        eventType.type !== "Event" &&
        eventType.type !== "CustomEvent",
    )
    .map((eventType) => {
      return {
        isClassExtension:
          !eventType.type.startsWith("CustomEvent<") &&
          !eventType.type.startsWith("{"),
        name: eventType.name,
        type: eventType.type.startsWith("{")
          ? `CustomEvent<${eventType.type}>`
          : eventType.type,
      };
    });
}

function getStronglyTypedEvents(
  component: Component,
  componentName: string,
): string {
  if (!component.events?.length) {
    return "";
  }

  const eventTypes = getEventTypes(component);
  const types: string[] = [
    `/**
      * A generic type for strongly typing custom events with their targets
      * @template T - The type of the event target (extends EventTarget)
      * @template D - The type of the detail payload for the custom event
      */
     type TypedEvent<
       T extends EventTarget,
       E = Event
     > = E & {
       target: T;
     };`,
    `/** \`${componentName}\` component event */
     export type ${componentName}ElementEvent<E = Event> = TypedEvent<${componentName}Element, E>;`,
  ];

  eventTypes.forEach((eventType) => {
    types.push(
      `/** \`${eventType.name}\` event type */
      export type ${componentName}${toPascalCase(eventType.name)}ElementEvent = ${componentName}ElementEvent<${eventType.type}>;`,
    );
  });

  return types.join("\n");
}

function getExtendedProps() {
  return config.reactProps === true
    ? "extends React.AllHTMLAttributes<HTMLElement>"
    : `extends Pick<React.AllHTMLAttributes<HTMLElement>, ${[
        ...BASE_PROPS.filter((x) => !NON_ATTR_BASE_PROPS.includes(x)),
        ...(config.reactProps || []),
      ]
        .map((x) => `'${x}'`)
        .join(" | ")}>`;
}

function getPropsInterface(
  componentName: string,
  booleanAttributes: MappedAttribute[],
  attributes: MappedAttribute[],
  events: EventName[],
  properties?: ClassField[],
) {
  return [
    ...getBooleanPropsTemplate(booleanAttributes),
    ...getAttributePropsTemplate(attributes, componentName),
    ...getPropertyPropsTemplate(properties, componentName),
    ...getEventPropsTemplate(events, componentName),
    ...getGlobalEventPropsTemplate(),
  ]?.join("");
}

function getUnusedProps(
  attributes: MappedAttribute[],
  booleanAttributes: MappedAttribute[],
  properties?: ClassField[],
) {
  return [
    ...[...(booleanAttributes || []), ...(attributes || [])].map(
      (x) => x.fieldName,
    ),
    ...(properties || []).map((x) => x.name),
  ]?.filter(
    (prop) =>
      prop &&
      !RESERVED_WORDS.includes(prop!) &&
      prop !== "for" &&
      prop !== "key",
  );
}

function getTagName(component: Component) {
  return config.scopedTags
    ? `\`\${scope?.tagFormatter?.('${component.tagName}', '${component.name}') || '${config.tagFormatter?.(component.tagName!, component.name) || component.tagName}'}\``
    : `"${component.tagName}"`;
}

function getBooleanPropsTemplate(booleanAttributes: MappedAttribute[]) {
  return (
    booleanAttributes?.map(
      (attr) => `
      /** ${attr.description} */
      ${attr?.fieldName}?: ${attr?.type?.text || "boolean"};
    `,
    ) || []
  );
}

function getAttributePropsTemplate(
  attributes: MappedAttribute[],
  componentName: string,
) {
  return (
    (attributes || []).map((attr) => {
      return `
      /** ${attr.description} */
      ${attr.fieldName}?: ${
        attr.type?.text.includes("{ELEMENT_NAME}")
          ? attr.type?.text.replace("{ELEMENT_NAME}", `${componentName}Element`)
          : MAPPED_PROPS.some((base) => base.propName === attr.fieldName)
            ? attr.type?.text || "string"
            : `${componentName}Element['${attr.fieldName}']`
      };
    `;
    }) || []
  );
}

function getPropertyPropsTemplate(
  properties: ClassField[] | undefined,
  componentName: string,
) {
  return (
    [...(properties || []), ...(config.globalProps || [])]?.map(
      (prop) => `
    /** ${prop.description} */
    ${prop.name}?: ${
      MAPPED_PROPS.some((base: MappedAttribute) => base.propName === prop.name)
        ? prop.type?.text || "string"
        : `${componentName}Element['${prop.name}']`
    };
  `,
    ) || []
  );
}

function getEventPropsTemplate(
  events: EventName[] | undefined,
  componentName: string,
) {
  return (
    events?.map(
      (event) => `
      /** ${event.description} */
      ${event.reactName}?: (event: ${getEventType(
        componentName,
        event.name,
        event.type,
        event.custom,
      )}) => void;
    `,
    ) || []
  );
}

function getGlobalEventPropsTemplate() {
  return (
    globalEvents?.map(
      (event) => `
      /** ${event.description} */
      ${event.event}?: (event: ${event.type}) => void;
    `,
    ) || []
  );
}

function getManifestContentTemplate(components: Component[]) {
  let exports = components
    .map(
      (component) =>
        `export * from './${getFormattedComponentName(component)}.js';`,
    )
    .join("");

  if (config.scopedTags) {
    exports += `
        export * from "./ScopeProvider.js";
      `;
  }

  return exports;
}

function getEventType(
  componentName: string,
  eventName: string,
  eventType?: string,
  eventCustom?: boolean,
) {
  if (eventCustom) {
    return eventType;
  }

  const base = config.stronglyTypedEvents
    ? `${componentName}ElementEvent`
    : "CustomEvent";

  if (!eventType || eventType === "Event" || eventType === "CustomEvent") {
    return base;
  }

  return base + `${componentName}${toPascalCase(eventName)}ElementEvent`;
}
