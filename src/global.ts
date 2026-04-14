import { MappedAttribute } from "./types";

export const MAPPED_PROPS: MappedAttribute[] = [
  {
    name: "className",
    propName: "className",
    fieldName: "className",
    originalName: "class",
    description:
      "A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the class selectors or functions like the method `Document.getElementsByClassName()`.",
  },

  {
    name: "exportparts",
    propName: "exportparts",
    fieldName: "exportparts",
    description:
      "Contains a space-separated list of the part names of the element that should be exposed on the host element.",
  },
  {
    name: "for",
    propName: "htmlFor",
    fieldName: "htmlFor",
    description:
      "Used for labels to link them with their inputs (using input id).",
    type: {
      text: "string",
    },
  },
  {
    name: "key",
    propName: "key",
    fieldName: "key",
    description:
      "Used to help React identify which items have changed, are added, or are removed within a list.",
    type: {
      text: "number | string",
    },
  },
  {
    name: "part",
    propName: "part",
    fieldName: "part",
    description:
      "Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element.",
  },
  {
    name: "ref",
    propName: "ref",
    fieldName: "ref",
    description:
      "A mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.",
    type: {
      text: "React.Ref<{ELEMENT_NAME}>",
    },
  },
  {
    name: "tabindex",
    propName: "tabIndex",
    fieldName: "tabIndex",
    description:
      "Allows developers to make HTML elements focusable, allow or prevent them from being sequentially focusable (usually with the `Tab` key, hence the name) and determine their relative ordering for sequential focus navigation.",
    type: {
      text: "number",
    },
  },
  {
    name: "readonly",
    propName: "readOnly",
    fieldName: "readOnly",
    description:
      "Indicates that the user cannot modify the value of the control.",
    type: {
      text: "boolean",
    },
  },
  {
    name: "autofocus",
    propName: "autoFocus",
    fieldName: "autoFocus",
    description:
      "Indicates that the element should be focused when the page has loaded.",
    type: {
      text: "boolean",
    },
  },
  {
    name: "spellcheck",
    propName: "spellCheck",
    fieldName: "spellCheck",
    description:
      "Controls whether the element should have spelling and grammar checked.",
    type: {
      text: "boolean",
    },
  },
  {
    name: "minlength",
    propName: "minLength",
    fieldName: "minLength",
    description:
      "Defines the minimum number of characters accepted for text input.",
    type: {
      text: "number",
    },
  },
  {
    name: "maxlength",
    propName: "maxLength",
    fieldName: "maxLength",
    description:
      "Defines the maximum number of characters accepted for text input.",
    type: {
      text: "number",
    },
  },
  {
    name: "autocomplete",
    propName: "autoComplete",
    fieldName: "autoComplete",
    description:
      "Specifies what permission the browser has to provide assistance in filling out form field values.",
  },
  {
    name: "autocapitalize",
    propName: "autoCapitalize",
    fieldName: "autoCapitalize",
    description:
      "Controls whether and how text input is automatically capitalized as it is entered by the user.",
  },
  {
    name: "autocorrect",
    propName: "autoCorrect",
    fieldName: "autoCorrect",
    description:
      "Indicates whether the browser's autocorrect feature is on or off.",
  },
  {
    name: "inputmode",
    propName: "inputMode",
    fieldName: "inputMode",
    description:
      "Hints at the type of data that might be entered by the user while editing the element.",
  },
  {
    name: "enterkeyhint",
    propName: "enterKeyHint",
    fieldName: "enterKeyHint",
    description:
      "Defines what action label or icon to present for the enter key on virtual keyboards.",
  },
];

export const GLOBAL_MAPPED_PROP_NAMES = [
  "className",
  "exportparts",
  "for",
  "key",
  "part",
  "ref",
  "tabindex",
];

export const BASE_PROPS = [
  "children",
  "className",
  "dir",
  "exportparts",
  "htmlFor",
  "hidden",
  "id",
  "key",
  "lang",
  "part",
  "ref",
  "slot",
  "style",
  "tabIndex",
  "title",
  "translate",
  "onClick",
  "onFocus",
  "onBlur",
];

export const NON_ATTR_BASE_PROPS = [
  "className",
  "exportparts",
  "htmlFor",
  "key",
  "part",
  "ref",
  "tabIndex",
];
