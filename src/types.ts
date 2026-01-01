import type { Attribute } from "custom-elements-manifest";

export interface ReactWrapperOptions {
  /** Used to get a specific path for a given component. Defaults to the component definition path in the CEM. */
  modulePath?: (className: string, tagName: string) => string;
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
