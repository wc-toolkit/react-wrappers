import type { Attribute } from "custom-elements-manifest";
import type React from "react";

export interface ReactWrapperOptions {
  /** Used to get a specific path for a given component. Defaults to the resolved module path in the CEM. */
  modulePath?: (className: string, tagName: string, cemModulePath?: string) => string;
  /** Path to output directory */
  outdir?: string;
  /** Indicates if the component classes are a default export rather than a named export */
  defaultExport?: boolean;
  /** Creates event types where the event's target is stringly typed to the custom element */
  stronglyTypedEvents?: boolean;
  /** Used to provide alternative property names to prevent name collisions with React */
  attributeMapping?: { [key: string]: string };
  /** Used to add custom global props to all component types */
  globalProps?: MappedAttribute[];
  /** Used to add custom global events to all component types */
  globalEvents?: GlobalEvent[];
  /** Includes React props defined for HTML elements */
  reactProps?: string[] | boolean;
  /** Generates context provider to scope component tags with a custom prefix or suffix */
  scopedTags?: boolean;
  /** Optional function to format the custom element tag names before processing. */
  tagFormatter?: (tagName: string, componentName: string) => string;
  /** Optional function to format the react component names. Defaults to the component class name. */
  componentNameFormatter?: (tagName: string, componentName: string) => string;
  /** Formats wrappers to make them safe to run in environments with Server Side Rendering (SSR) */
  ssrSafe?: boolean;
  /** Class names of any components you would like to exclude from the custom data */
  exclude?: string[];
  /** The property name from the component object that you would like to use for the description of your component */
  descriptionSrc?: "description" | "summary" | (string & {});
  /** Show debug logs produced by the plugin */
  debug?: boolean;
  /** Prevents plugin from executing */
  skip?: boolean;
}

export interface GlobalEvent {
  event: string;
  description: string;
  type: string;
}

export interface MappedAttribute extends Attribute {
  originalName?: string;
  propName?: string;
}

export interface ExtendedAttribute extends MappedAttribute {
  mappedName: string;
}

export interface ComponentAttributes {
  attributes: MappedAttribute[];
  booleanAttributes: MappedAttribute[];
}

export interface EventName {
  name: string;
  reactName: string;
  description?: string;
  type?: string;
  custom?: boolean;
}

export type RuntimePropMap = readonly string[] | Record<string, string>;

export type RuntimeEventDescriptor<TDetail = unknown> =
  | string
  | {
      name: string;
      detail?: TDetail;
    };

/** Runtime event handlers must use React-style prop names (e.g. `onReady`). */
export type RuntimeEventMap = Partial<
  Record<`on${Capitalize<string>}`, RuntimeEventDescriptor>
>;

type RuntimeEmptyEventMap = Record<never, string>;

export interface RuntimeManifestType {
  text?: string;
}

export interface RuntimeManifestAttribute {
  name: string;
  fieldName?: string;
  type?: RuntimeManifestType;
}

export interface RuntimeManifestEvent {
  name: string;
}

export interface RuntimeManifestMember {
  kind?: string;
  name?: string;
  privacy?: string;
  static?: boolean;
  attribute?: string;
}

export interface RuntimeManifestComponent {
  kind?: string;
  name: string;
  tagName?: string;
  customElement?: boolean;
  attributes?: readonly RuntimeManifestAttribute[];
  events?: readonly RuntimeManifestEvent[];
  members?: readonly RuntimeManifestMember[];
}

export interface RuntimeManifestModule {
  kind?: string;
  path?: string;
  declarations?: readonly RuntimeManifestComponent[];
}

export interface RuntimeManifest {
  schemaVersion?: string;
  readme?: string;
  modules?: readonly RuntimeManifestModule[];
}

type RuntimeManifestDeclarations<TManifest> =
  TManifest extends { modules?: readonly (infer TModule)[] }
    ? TModule extends { declarations?: readonly (infer TDeclaration)[] }
      ? TDeclaration
      : never
    : never;

// Many Custom Elements Manifest JSON files don't preserve `customElement: true` as a
// literal type, so we key off the presence of `name` + `tagName` instead.
type RuntimeManifestCustomElementDeclarations<TManifest> = Extract<
  RuntimeManifestDeclarations<TManifest>,
  { name: string; tagName: string }
>;

export type RuntimeManifestClassNames<TManifest> = Extract<
  RuntimeManifestCustomElementDeclarations<TManifest> extends { name: infer TName }
    ? TName
    : never,
  string
>;

type RuntimeManifestDeclarationByTagName<
  TManifest,
  TTagName extends string,
> = Extract<RuntimeManifestCustomElementDeclarations<TManifest>, { tagName: TTagName }>;

type RuntimeManifestEventNamesForTagName<
  TManifest,
  TTagName extends string,
> = RuntimeManifestDeclarationByTagName<TManifest, TTagName> extends infer TDeclaration
  ? TDeclaration extends { events?: readonly (infer TEvent)[] }
    ? TEvent extends { name: infer TName }
      ? Extract<TName, string>
      : never
    : never
  : never;

type RuntimeManifestCustomEventNamesForTagName<
  TManifest,
  TTagName extends string,
> = Extract<RuntimeManifestEventNamesForTagName<TManifest, TTagName>, `${string}-${string}`>;

type RuntimeManifestToPascalCase<T extends string> =
  T extends `${infer Head}-${infer Tail}`
    ? `${Capitalize<Head>}${RuntimeManifestToPascalCase<Tail>}`
    : Capitalize<T>;

type RuntimeManifestEventMapForTagName<
  TManifest,
  TTagName extends string,
> = Partial<
  Record<
    `on${RuntimeManifestToPascalCase<RuntimeManifestCustomEventNamesForTagName<TManifest, TTagName>>}`,
    RuntimeEventDescriptor
  >
>;

type RuntimeManifestDeclarationByClassName<
  TManifest,
  TClassName extends string,
> = Extract<RuntimeManifestCustomElementDeclarations<TManifest>, { name: TClassName }>;

type RuntimeManifestEventNamesForClassName<
  TManifest,
  TClassName extends string,
> = RuntimeManifestDeclarationByClassName<TManifest, TClassName> extends infer TDeclaration
  ? TDeclaration extends { events?: readonly (infer TEvent)[] }
    ? TEvent extends { name: infer TName }
      ? Extract<TName, string>
      : never
    : never
  : never;

type RuntimeManifestCustomEventNamesForClassName<
  TManifest,
  TClassName extends string,
> = Extract<RuntimeManifestEventNamesForClassName<TManifest, TClassName>, `${string}-${string}`>;

type RuntimeManifestEventMapForClassName<
  TManifest,
  TClassName extends string,
> = Partial<
  Record<
    `on${RuntimeManifestToPascalCase<RuntimeManifestCustomEventNamesForClassName<TManifest, TClassName>>}`,
    RuntimeEventDescriptor
  >
>;

export interface RuntimeWrapperOptions<
  TEvents extends RuntimeEventMap = RuntimeEventMap,
  TBooleanAttributes extends readonly string[] = readonly string[],
  TExtends extends string = string,
> {
  /** Optional attribute mapping. Includes `className` -> `class` and `htmlFor` -> `for` by default. */
  attributes?: RuntimePropMap;
  /** Optional list or map of React props that should be assigned as element properties instead of rendered attributes. */
  properties?: RuntimePropMap;
  /** Optional map of React event prop names to DOM event names. */
  events?: TEvents;
  /** Optional React prop names that should render as boolean attributes. */
  booleanAttributes?: TBooleanAttributes;
  /** Optional manifest class name to inherit API metadata from. */
  extends?: TExtends;
  /** Optional React display name override. */
  displayName?: string;
  /** Strict mode (default: true). If false, forwards unknown props as attributes. */
  strict?: boolean;
}

export type RuntimeElementConstructor<TElement extends HTMLElement = HTMLElement> =
  abstract new (...args: never[]) => TElement;

type RuntimeFunction = (...args: never[]) => unknown;

type NonFunctionPropertyNames<T> = {
  [K in keyof T]-?: T[K] extends RuntimeFunction ? never : K;
}[keyof T];

export type RuntimeClassProps<TElement extends HTMLElement> = Partial<
  Pick<TElement, Exclude<NonFunctionPropertyNames<TElement>, keyof HTMLElement>>
>;

type RuntimeEventHandler<TDescriptor> =
  TDescriptor extends string
    ? (event: Event) => void
    : TDescriptor extends { detail: infer TDetail }
      ? (event: CustomEvent<TDetail>) => void
      : (event: Event) => void;

export type RuntimeEventHandlerProps<TEvents extends RuntimeEventMap> = {
  [K in keyof TEvents]?: RuntimeEventHandler<NonNullable<TEvents[K]>>;
};

export type RuntimeBooleanAttributeProps<
  TBooleanAttributes extends readonly string[],
> = {
  [K in TBooleanAttributes[number]]?: boolean;
};

export type RuntimeInferredProps<
  TElement extends HTMLElement,
  TEvents extends RuntimeEventMap = RuntimeEmptyEventMap,
  TBooleanAttributes extends readonly string[] = readonly [],
> = RuntimeClassProps<TElement> &
  RuntimeEventHandlerProps<TEvents> &
  RuntimeBooleanAttributeProps<TBooleanAttributes>;

export type RuntimeWrapperProps<
  TElement extends HTMLElement,
  TProps extends object = Record<string, never>,
> = React.AllHTMLAttributes<TElement> & TProps;

export type RuntimeWrapperReturn<
  TElement extends HTMLElement,
  TProps extends object = Record<string, never>,
> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<RuntimeWrapperProps<TElement, TProps>> &
    React.RefAttributes<TElement>
>;

export interface RuntimeWrapperSetupReturn<
  TManifest extends RuntimeManifest,
> {
  <
    TTagName extends string,
    TClass extends RuntimeElementConstructor,
    TExtends extends RuntimeManifestClassNames<TManifest>,
    TEvents extends RuntimeEventMap = RuntimeEmptyEventMap,
    TBooleanAttributes extends readonly string[] = readonly [],
  >(
    tagName: TTagName,
    elementClass: TClass,
    options: RuntimeWrapperOptions<TEvents, TBooleanAttributes, TExtends> & {
      extends: TExtends;
    },
  ): RuntimeWrapperReturn<
    InstanceType<TClass>,
    RuntimeInferredProps<
      InstanceType<TClass>,
      TEvents & RuntimeManifestEventMapForClassName<TManifest, TExtends>,
      TBooleanAttributes
    >
  >;

  <
    TTagName extends string,
    TClass extends RuntimeElementConstructor,
    TEvents extends RuntimeEventMap = RuntimeEmptyEventMap,
    TBooleanAttributes extends readonly string[] = readonly [],
  >(
    tagName: TTagName,
    elementClass: TClass,
    options?: RuntimeWrapperOptions<
      TEvents,
      TBooleanAttributes,
      RuntimeManifestClassNames<TManifest>
    >,
  ): RuntimeWrapperReturn<
    InstanceType<TClass>,
    RuntimeInferredProps<
      InstanceType<TClass>,
      TEvents & RuntimeManifestEventMapForTagName<TManifest, TTagName>,
      TBooleanAttributes
    >
  >;

  <
    TTagName extends string,
    TElement extends HTMLElement = HTMLElement,
    TProps extends object = Record<string, never>,
    TEvents extends RuntimeEventMap = RuntimeEmptyEventMap,
    TBooleanAttributes extends readonly string[] = readonly [],
  >(
    tagName: TTagName,
    options?: RuntimeWrapperOptions<
      TEvents,
      TBooleanAttributes,
      RuntimeManifestClassNames<TManifest>
    >,
  ): RuntimeWrapperReturn<
    TElement,
    TProps &
      RuntimeInferredProps<
        TElement,
        TEvents & RuntimeManifestEventMapForTagName<TManifest, TTagName>,
        TBooleanAttributes
      >
  >;
}
