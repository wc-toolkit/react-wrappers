// This file is generated from @awesome.me/webawesome/dist/custom-elements.json
// It intentionally includes only the components used in this demo.

export const webawesomeManifestLite = {
  "schemaVersion": "1.0.0",
  "modules": [
    {
      "kind": "javascript-module",
      "path": "@awesome.me/webawesome/dist/custom-elements.json#lite",
      "declarations": [
        {
          "kind": "class",
          "description": "",
          "name": "WaButton",
          "cssParts": [
            {
              "description": "The component's base wrapper.",
              "name": "base"
            },
            {
              "description": "The container that wraps the `start` slot.",
              "name": "start"
            },
            {
              "description": "The button's label.",
              "name": "label"
            },
            {
              "description": "The container that wraps the `end` slot.",
              "name": "end"
            },
            {
              "description": "The button's caret icon, a `<wa-icon>` element.",
              "name": "caret"
            },
            {
              "description": "The spinner that shows when the button is in the loading state.",
              "name": "spinner"
            }
          ],
          "slots": [
            {
              "description": "The button's label.",
              "name": ""
            },
            {
              "description": "An element, such as `<wa-icon>`, placed before the label.",
              "name": "start"
            },
            {
              "description": "An element, such as `<wa-icon>`, placed after the label.",
              "name": "end"
            }
          ],
          "members": [
            {
              "kind": "field",
              "name": "shadowRootOptions",
              "type": {
                "text": "object"
              },
              "static": true,
              "default": "{ ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true }"
            },
            {
              "kind": "field",
              "name": "css",
              "type": {
                "text": "CSSResultGroup | undefined"
              },
              "static": true,
              "description": "One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended.",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              },
              "default": "[styles, variantStyles, sizeStyles]"
            },
            {
              "kind": "field",
              "name": "validators",
              "type": {
                "text": "Validator[]"
              },
              "default": "[]",
              "static": true,
              "description": "Validators are static because they have `observedAttributes`, essentially attributes to \"watch\"\nfor changes. Whenever these attributes change, we want to be notified and update the validator.",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "assumeInteractionOn",
              "type": {
                "text": "string[]"
              },
              "default": "['click']",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "hasSlotController",
              "privacy": "private",
              "readonly": true,
              "default": "new HasSlotController(this, '[default]', 'start', 'end')"
            },
            {
              "kind": "field",
              "name": "localize",
              "privacy": "private",
              "readonly": true,
              "default": "new LocalizeController(this)"
            },
            {
              "kind": "field",
              "name": "button",
              "type": {
                "text": "HTMLButtonElement | HTMLLinkElement"
              }
            },
            {
              "kind": "field",
              "name": "labelSlot",
              "type": {
                "text": "HTMLSlotElement"
              }
            },
            {
              "kind": "field",
              "name": "invalid",
              "type": {
                "text": "boolean"
              },
              "default": "false"
            },
            {
              "kind": "field",
              "name": "isIconButton",
              "type": {
                "text": "boolean"
              },
              "default": "false"
            },
            {
              "kind": "field",
              "name": "title",
              "type": {
                "text": "string"
              },
              "default": "''",
              "attribute": "title"
            },
            {
              "kind": "field",
              "name": "variant",
              "type": {
                "text": "'neutral' | 'brand' | 'success' | 'warning' | 'danger'"
              },
              "default": "'neutral'",
              "description": "The button's theme variant. Defaults to `neutral` if not within another element with a variant.",
              "attribute": "variant",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "appearance",
              "type": {
                "text": "'accent' | 'filled' | 'outlined' | 'filled-outlined' | 'plain'"
              },
              "default": "'accent'",
              "description": "The button's visual appearance.",
              "attribute": "appearance",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "size",
              "type": {
                "text": "'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large'"
              },
              "default": "'m'",
              "description": "The button's size.",
              "attribute": "size",
              "reflects": true
            },
            {
              "kind": "method",
              "name": "handleSizeChange",
              "type": {
                "text": "handleSizeChange() => void"
              }
            },
            {
              "kind": "field",
              "name": "withCaret",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior.",
              "attribute": "with-caret",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "withStart",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Only required for SSR. Set to `true` if you're slotting in a `start` element so the server-rendered markup\nincludes the start slot before the component hydrates on the client.",
              "attribute": "with-start"
            },
            {
              "kind": "field",
              "name": "withEnd",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Only required for SSR. Set to `true` if you're slotting in an `end` element so the server-rendered markup\nincludes the end slot before the component hydrates on the client.",
              "attribute": "with-end"
            },
            {
              "kind": "field",
              "name": "disabled",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Disables the button.",
              "attribute": "disabled",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "loading",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Draws the button in a loading state.",
              "attribute": "loading",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "pill",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Draws a pill-style button with rounded edges.",
              "attribute": "pill",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "type",
              "type": {
                "text": "'button' | 'submit' | 'reset'"
              },
              "default": "'button'",
              "description": "The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native\n`<button>` elements behave. When the type is `submit`, the button will submit the surrounding form.",
              "attribute": "type"
            },
            {
              "kind": "field",
              "name": "name",
              "type": {
                "text": "string | null"
              },
              "default": "null",
              "description": "The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter.\nThis attribute is ignored when `href` is present.",
              "attribute": "name",
              "reflects": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "value",
              "type": {
                "text": "string"
              },
              "description": "The value of the button, submitted as a pair with the button's name as part of the form data, but only when this\nbutton is the submitter. This attribute is ignored when `href` is present.",
              "attribute": "value",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "href",
              "type": {
                "text": "string"
              },
              "description": "When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.",
              "attribute": "href",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "target",
              "type": {
                "text": "'_blank' | '_parent' | '_self' | '_top'"
              },
              "description": "Tells the browser where to open the link. Only used when `href` is present.",
              "attribute": "target"
            },
            {
              "kind": "field",
              "name": "rel",
              "type": {
                "text": "string | undefined"
              },
              "description": "When using `href`, this attribute will map to the underlying link's `rel` attribute.",
              "attribute": "rel"
            },
            {
              "kind": "field",
              "name": "download",
              "type": {
                "text": "string | undefined"
              },
              "description": "Tells the browser to download the linked file as this filename. Only used when `href` is present.",
              "attribute": "download"
            },
            {
              "kind": "field",
              "name": "formAction",
              "type": {
                "text": "string"
              },
              "description": "Used to override the form owner's `action` attribute.",
              "attribute": "formaction"
            },
            {
              "kind": "field",
              "name": "formEnctype",
              "type": {
                "text": "'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'"
              },
              "description": "Used to override the form owner's `enctype` attribute.",
              "attribute": "formenctype"
            },
            {
              "kind": "field",
              "name": "formMethod",
              "type": {
                "text": "'post' | 'get'"
              },
              "description": "Used to override the form owner's `method` attribute.",
              "attribute": "formmethod"
            },
            {
              "kind": "field",
              "name": "formNoValidate",
              "type": {
                "text": "boolean"
              },
              "description": "Used to override the form owner's `novalidate` attribute.",
              "attribute": "formnovalidate"
            },
            {
              "kind": "field",
              "name": "formTarget",
              "type": {
                "text": "'_self' | '_blank' | '_parent' | '_top' | string"
              },
              "description": "Used to override the form owner's `target` attribute.",
              "attribute": "formtarget"
            },
            {
              "kind": "method",
              "name": "constructLightDOMButton",
              "privacy": "private"
            },
            {
              "kind": "method",
              "name": "handleClick",
              "privacy": "private",
              "parameters": [
                {
                  "name": "event",
                  "type": {
                    "text": "PointerEvent"
                  }
                }
              ]
            },
            {
              "kind": "method",
              "name": "handleInvalid",
              "privacy": "private"
            },
            {
              "kind": "method",
              "name": "handleLabelSlotChange",
              "privacy": "private"
            },
            {
              "kind": "method",
              "name": "isButton",
              "privacy": "private"
            },
            {
              "kind": "method",
              "name": "isLink",
              "privacy": "private"
            },
            {
              "kind": "method",
              "name": "handleDisabledChange",
              "type": {
                "text": "handleDisabledChange() => void"
              }
            },
            {
              "kind": "method",
              "name": "handleHrefChange",
              "type": {
                "text": "handleHrefChange() => void"
              }
            },
            {
              "kind": "method",
              "name": "handleLoadingChange",
              "type": {
                "text": "handleLoadingChange() => void"
              }
            },
            {
              "kind": "method",
              "name": "setValue",
              "parameters": [
                {
                  "name": "_args",
                  "type": {
                    "text": "Parameters<WebAwesomeFormAssociatedElement['setValue']>"
                  }
                }
              ],
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "setValue(_args: Parameters<WebAwesomeFormAssociatedElement['setValue']>) => void"
              }
            },
            {
              "kind": "method",
              "name": "click",
              "description": "Simulates a click on the button.",
              "type": {
                "text": "click() => void"
              }
            },
            {
              "kind": "method",
              "name": "focus",
              "parameters": [
                {
                  "name": "options",
                  "optional": true,
                  "type": {
                    "text": "FocusOptions"
                  }
                }
              ],
              "description": "Sets focus on the button.",
              "type": {
                "text": "focus(options?: FocusOptions) => void"
              }
            },
            {
              "kind": "method",
              "name": "blur",
              "description": "Removes focus from the button.",
              "type": {
                "text": "blur() => void"
              }
            },
            {
              "kind": "field",
              "name": "formAssociated",
              "type": {
                "text": "boolean"
              },
              "static": true,
              "default": "true",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "required",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "input",
              "type": {
                "text": "(HTMLElement & { value: unknown }) | HTMLInputElement | HTMLTextAreaElement | undefined"
              },
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "valueHasChanged",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "hasInteracted",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "customError",
              "type": {
                "text": "string | null"
              },
              "default": "null",
              "attribute": "custom-error",
              "reflects": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "emittedEvents",
              "type": {
                "text": "string[]"
              },
              "privacy": "private",
              "default": "[]",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "states",
              "type": {
                "text": "CustomStateSet"
              },
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "emitInvalid",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "handleInteraction",
              "privacy": "private",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "labels",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "method",
              "name": "getForm",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "getForm() => void"
              }
            },
            {
              "kind": "field",
              "name": "form",
              "description": "By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you\nto place the form control outside of a form and associate it with the form that has this `id`. The form must be in\nthe same document or shadow root for this to work.",
              "type": {
                "text": "HTMLFormElement | null"
              },
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "validity",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "willValidate",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "validationMessage",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "method",
              "name": "checkValidity",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "checkValidity() => void"
              }
            },
            {
              "kind": "method",
              "name": "reportValidity",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "reportValidity() => void"
              }
            },
            {
              "kind": "field",
              "name": "validationTarget",
              "type": {
                "text": "undefined | HTMLElement"
              },
              "description": "Override this to change where constraint validation popups are anchored.",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "method",
              "name": "setValidity",
              "parameters": [
                {
                  "name": "args",
                  "type": {
                    "text": "Parameters<typeof this.internals.setValidity>"
                  }
                }
              ],
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "setValidity(args: Parameters<typeof this.internals.setValidity>) => void"
              }
            },
            {
              "kind": "method",
              "name": "setCustomStates",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "setCustomStates() => void"
              }
            },
            {
              "kind": "method",
              "name": "setCustomValidity",
              "parameters": [
                {
                  "name": "message",
                  "type": {
                    "text": "string"
                  }
                }
              ],
              "description": "Do not use this when creating a \"Validator\". This is intended for end users of components.\nWe track manually defined custom errors so we don't clear them on accident in our validators.",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "setCustomValidity(message: string) => void"
              }
            },
            {
              "kind": "method",
              "name": "formResetCallback",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "formResetCallback() => void"
              }
            },
            {
              "kind": "method",
              "name": "formDisabledCallback",
              "parameters": [
                {
                  "name": "isDisabled",
                  "type": {
                    "text": "boolean"
                  }
                }
              ],
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "formDisabledCallback(isDisabled: boolean) => void"
              }
            },
            {
              "kind": "method",
              "name": "formStateRestoreCallback",
              "parameters": [
                {
                  "name": "state",
                  "type": {
                    "text": "string | File | FormData | null"
                  }
                },
                {
                  "name": "reason",
                  "type": {
                    "text": "'autocomplete' | 'restore'"
                  }
                }
              ],
              "description": "Called when the browser is trying to restore element’s state to state in which case reason is \"restore\", or when\nthe browser is trying to fulfill autofill on behalf of user in which case reason is \"autocomplete\". In the case of\n\"restore\", state is a string, File, or FormData object previously set as the second argument to setFormValue.",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "formStateRestoreCallback(state: string | File | FormData | null, reason: 'autocomplete' | 'restore') => void"
              }
            },
            {
              "kind": "field",
              "name": "allValidators",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "method",
              "name": "resetValidity",
              "description": "Reset validity is a way of removing manual custom errors and native validation.",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "resetValidity() => void"
              }
            },
            {
              "kind": "method",
              "name": "updateValidity",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "updateValidity() => void"
              }
            },
            {
              "kind": "field",
              "name": "#hasRecordedInitialProperties",
              "privacy": "private",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "initialReflectedProperties",
              "type": {
                "text": "Map<string, unknown>"
              },
              "default": "new Map()",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "internals",
              "type": {
                "text": "ElementInternals"
              },
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "dir",
              "type": {
                "text": "string"
              },
              "attribute": "dir",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "lang",
              "type": {
                "text": "string"
              },
              "attribute": "lang",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "didSSR",
              "attribute": "did-ssr",
              "reflects": true,
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            }
          ],
          "events": [
            {
              "description": "Emitted when the button loses focus.",
              "name": "blur",
              "reactName": "onBlur",
              "eventName": "BlurEvent"
            },
            {
              "description": "Emitted when the button gains focus.",
              "name": "focus",
              "reactName": "onFocus",
              "eventName": "FocusEvent"
            },
            {
              "description": "Emitted when the form control has been checked for validity and its constraints aren't satisfied.",
              "name": "wa-invalid",
              "reactName": "onWaInvalid",
              "eventName": "WaInvalidEvent"
            }
          ],
          "attributes": [
            {
              "name": "title",
              "type": {
                "text": "string"
              },
              "default": "''",
              "fieldName": "title"
            },
            {
              "name": "variant",
              "type": {
                "text": "'neutral' | 'brand' | 'success' | 'warning' | 'danger'"
              },
              "default": "'neutral'",
              "description": "The button's theme variant. Defaults to `neutral` if not within another element with a variant.",
              "fieldName": "variant"
            },
            {
              "name": "appearance",
              "type": {
                "text": "'accent' | 'filled' | 'outlined' | 'filled-outlined' | 'plain'"
              },
              "default": "'accent'",
              "description": "The button's visual appearance.",
              "fieldName": "appearance"
            },
            {
              "name": "size",
              "type": {
                "text": "'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large'"
              },
              "default": "'m'",
              "description": "The button's size.",
              "fieldName": "size"
            },
            {
              "name": "with-caret",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior.",
              "fieldName": "withCaret"
            },
            {
              "name": "with-start",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Only required for SSR. Set to `true` if you're slotting in a `start` element so the server-rendered markup\nincludes the start slot before the component hydrates on the client.",
              "fieldName": "withStart"
            },
            {
              "name": "with-end",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Only required for SSR. Set to `true` if you're slotting in an `end` element so the server-rendered markup\nincludes the end slot before the component hydrates on the client.",
              "fieldName": "withEnd"
            },
            {
              "name": "disabled",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Disables the button.",
              "fieldName": "disabled",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "src/internal/webawesome-form-associated-element.ts"
              }
            },
            {
              "name": "loading",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Draws the button in a loading state.",
              "fieldName": "loading"
            },
            {
              "name": "pill",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Draws a pill-style button with rounded edges.",
              "fieldName": "pill"
            },
            {
              "name": "type",
              "type": {
                "text": "'button' | 'submit' | 'reset'"
              },
              "default": "'button'",
              "description": "The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native\n`<button>` elements behave. When the type is `submit`, the button will submit the surrounding form.",
              "fieldName": "type"
            },
            {
              "name": "name",
              "type": {
                "text": "string | null"
              },
              "default": "null",
              "description": "The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter.\nThis attribute is ignored when `href` is present.",
              "fieldName": "name",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "src/internal/webawesome-form-associated-element.ts"
              }
            },
            {
              "name": "value",
              "type": {
                "text": "string"
              },
              "description": "The value of the button, submitted as a pair with the button's name as part of the form data, but only when this\nbutton is the submitter. This attribute is ignored when `href` is present.",
              "fieldName": "value"
            },
            {
              "name": "href",
              "type": {
                "text": "string"
              },
              "description": "When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.",
              "fieldName": "href"
            },
            {
              "name": "target",
              "type": {
                "text": "'_blank' | '_parent' | '_self' | '_top'"
              },
              "description": "Tells the browser where to open the link. Only used when `href` is present.",
              "fieldName": "target"
            },
            {
              "name": "rel",
              "type": {
                "text": "string | undefined"
              },
              "description": "When using `href`, this attribute will map to the underlying link's `rel` attribute.",
              "fieldName": "rel"
            },
            {
              "name": "download",
              "type": {
                "text": "string | undefined"
              },
              "description": "Tells the browser to download the linked file as this filename. Only used when `href` is present.",
              "fieldName": "download"
            },
            {
              "name": "formaction",
              "type": {
                "text": "string"
              },
              "description": "Used to override the form owner's `action` attribute.",
              "fieldName": "formAction"
            },
            {
              "name": "formenctype",
              "type": {
                "text": "'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'"
              },
              "description": "Used to override the form owner's `enctype` attribute.",
              "fieldName": "formEnctype"
            },
            {
              "name": "formmethod",
              "type": {
                "text": "'post' | 'get'"
              },
              "description": "Used to override the form owner's `method` attribute.",
              "fieldName": "formMethod"
            },
            {
              "name": "formnovalidate",
              "type": {
                "text": "boolean"
              },
              "description": "Used to override the form owner's `novalidate` attribute.",
              "fieldName": "formNoValidate"
            },
            {
              "name": "formtarget",
              "type": {
                "text": "'_self' | '_blank' | '_parent' | '_top' | string"
              },
              "description": "Used to override the form owner's `target` attribute.",
              "fieldName": "formTarget"
            },
            {
              "name": "custom-error",
              "type": {
                "text": "string | null"
              },
              "default": "null",
              "fieldName": "customError",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "src/internal/webawesome-form-associated-element.ts"
              }
            },
            {
              "name": "dir",
              "type": {
                "text": "string"
              },
              "fieldName": "dir",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "src/internal/webawesome-element.ts"
              }
            },
            {
              "name": "lang",
              "type": {
                "text": "string"
              },
              "fieldName": "lang",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "src/internal/webawesome-element.ts"
              }
            },
            {
              "name": "did-ssr",
              "fieldName": "didSSR",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "src/internal/webawesome-element.ts"
              }
            }
          ],
          "cssStates": [
            {
              "description": "Applied when the button is disabled.",
              "name": "disabled"
            },
            {
              "description": "Applied when the button contains only a `<wa-icon>` with no other content.",
              "name": "icon-button"
            },
            {
              "description": "Applied when the button is rendered as a link (i.e. `href` is set).",
              "name": "link"
            },
            {
              "description": "Applied when the button is in the loading state.",
              "name": "loading"
            }
          ],
          "superclass": {
            "name": "WebAwesomeFormAssociatedElement",
            "module": "/src/internal/webawesome-form-associated-element.js"
          },
          "summary": "Buttons represent actions the user can take, such as submitting a form, opening a dialog, or navigating to\nanother page.",
          "jsDoc": "/**\n * @summary Buttons represent actions the user can take, such as submitting a form, opening a dialog, or navigating to\n *  another page.\n * @documentation https://webawesome.com/docs/components/button\n * @status stable\n * @since 2.0\n *\n * @dependency wa-icon\n * @dependency wa-spinner\n *\n * @event blur - Emitted when the button loses focus.\n * @event focus - Emitted when the button gains focus.\n * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.\n *\n * @slot - The button's label.\n * @slot start - An element, such as `<wa-icon>`, placed before the label.\n * @slot end - An element, such as `<wa-icon>`, placed after the label.\n *\n * @csspart base - The component's base wrapper.\n * @csspart start - The container that wraps the `start` slot.\n * @csspart label - The button's label.\n * @csspart end - The container that wraps the `end` slot.\n * @csspart caret - The button's caret icon, a `<wa-icon>` element.\n * @csspart spinner - The spinner that shows when the button is in the loading state.\n *\n * @cssstate disabled - Applied when the button is disabled.\n * @cssstate icon-button - Applied when the button contains only a `<wa-icon>` with no other content.\n * @cssstate link - Applied when the button is rendered as a link (i.e. `href` is set).\n * @cssstate loading - Applied when the button is in the loading state.\n */",
          "documentation": "https://webawesome.com/docs/components/button",
          "status": "stable",
          "since": "2.0",
          "dependencies": [
            "wa-icon",
            "wa-spinner"
          ],
          "tagName": "wa-button",
          "customElement": true,
          "modulePath": "components/button/button.js",
          "definitionPath": "components/button/button.js"
        },
        {
          "kind": "class",
          "description": "",
          "name": "WaInput",
          "cssParts": [
            {
              "description": "The label",
              "name": "label"
            },
            {
              "description": "The hint's wrapper.",
              "name": "hint"
            },
            {
              "description": "The wrapper being rendered as an input",
              "name": "base"
            },
            {
              "description": "The internal `<input>` control.",
              "name": "input"
            },
            {
              "description": "The container that wraps the `start` slot.",
              "name": "start"
            },
            {
              "description": "The clear button.",
              "name": "clear-button"
            },
            {
              "description": "The password toggle button.",
              "name": "password-toggle-button"
            },
            {
              "description": "The container that wraps the `end` slot.",
              "name": "end"
            }
          ],
          "slots": [
            {
              "description": "The input's label. Alternatively, you can use the `label` attribute.",
              "name": "label"
            },
            {
              "description": "An element, such as `<wa-icon>`, placed at the start of the input control.",
              "name": "start"
            },
            {
              "description": "An element, such as `<wa-icon>`, placed at the end of the input control.",
              "name": "end"
            },
            {
              "description": "An icon to use in lieu of the default clear icon.",
              "name": "clear-icon"
            },
            {
              "description": "An icon to use in lieu of the default show password icon.",
              "name": "show-password-icon"
            },
            {
              "description": "An icon to use in lieu of the default hide password icon.",
              "name": "hide-password-icon"
            },
            {
              "description": "Text that describes how to use the input. Alternatively, you can use the `hint` attribute.",
              "name": "hint"
            }
          ],
          "members": [
            {
              "kind": "field",
              "name": "css",
              "type": {
                "text": "CSSResultGroup | undefined"
              },
              "static": true,
              "description": "One or more CSSResultGroup to include in the component's shadow root. Host styles are automatically prepended.",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              },
              "default": "[sizeStyles, formControlStyles, styles]"
            },
            {
              "kind": "field",
              "name": "shadowRootOptions",
              "type": {
                "text": "object"
              },
              "static": true,
              "default": "{ ...WebAwesomeFormAssociatedElement.shadowRootOptions, delegatesFocus: true }"
            },
            {
              "kind": "field",
              "name": "validators",
              "type": {
                "text": "Validator[]"
              },
              "default": "[]",
              "static": true,
              "description": "Validators are static because they have `observedAttributes`, essentially attributes to \"watch\"\nfor changes. Whenever these attributes change, we want to be notified and update the validator.",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "assumeInteractionOn",
              "type": {
                "text": "string[]"
              },
              "default": "['blur', 'input']",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "hasSlotController",
              "privacy": "private",
              "readonly": true,
              "default": "new HasSlotController(this, 'hint', 'label')"
            },
            {
              "kind": "field",
              "name": "localize",
              "privacy": "private",
              "readonly": true,
              "default": "new LocalizeController(this)"
            },
            {
              "kind": "field",
              "name": "input",
              "type": {
                "text": "(HTMLElement & { value: unknown }) | HTMLInputElement | HTMLTextAreaElement | undefined"
              },
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "title",
              "type": {
                "text": "string"
              },
              "default": "''",
              "attribute": "title"
            },
            {
              "kind": "field",
              "name": "type",
              "type": {
                "text": "| 'date'\n    | 'datetime-local'\n    | 'email'\n    | 'number'\n    | 'password'\n    | 'search'\n    | 'tel'\n    | 'text'\n    | 'time'\n    | 'url'"
              },
              "default": "'text'",
              "description": "The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. Defaults\nto `text`.",
              "attribute": "type",
              "reflects": true,
              "parsedType": {
                "text": "'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'"
              }
            },
            {
              "kind": "field",
              "name": "_value",
              "type": {
                "text": "string | null"
              },
              "privacy": "private",
              "default": "null"
            },
            {
              "kind": "field",
              "name": "value",
              "description": "The current value of the input, submitted as a name/value pair with form data."
            },
            {
              "kind": "field",
              "name": "defaultValue",
              "type": {
                "text": "string | null"
              },
              "description": "The default value of the form control. Primarily used for resetting the form control.",
              "attribute": "value",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "size",
              "type": {
                "text": "'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large'"
              },
              "default": "'m'",
              "description": "The input's size.",
              "attribute": "size",
              "reflects": true
            },
            {
              "kind": "method",
              "name": "handleSizeChange",
              "type": {
                "text": "handleSizeChange() => void"
              }
            },
            {
              "kind": "field",
              "name": "appearance",
              "type": {
                "text": "'filled' | 'outlined' | 'filled-outlined'"
              },
              "default": "'outlined'",
              "description": "The input's visual appearance.",
              "attribute": "appearance",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "pill",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Draws a pill-style input with rounded edges.",
              "attribute": "pill",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "label",
              "type": {
                "text": "string"
              },
              "default": "''",
              "description": "The input's label. If you need to display HTML, use the `label` slot instead.",
              "attribute": "label"
            },
            {
              "kind": "field",
              "name": "hint",
              "type": {
                "text": "string"
              },
              "default": "''",
              "description": "The input's hint. If you need to display HTML, use the `hint` slot instead.",
              "attribute": "hint"
            },
            {
              "kind": "field",
              "name": "withClear",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Adds a clear button when the input is not empty.",
              "attribute": "with-clear"
            },
            {
              "kind": "field",
              "name": "placeholder",
              "type": {
                "text": "string"
              },
              "default": "''",
              "description": "Placeholder text to show as a hint when the input is empty.",
              "attribute": "placeholder"
            },
            {
              "kind": "field",
              "name": "readonly",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Makes the input readonly.",
              "attribute": "readonly",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "passwordToggle",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Adds a button to toggle the password's visibility. Only applies to password types.",
              "attribute": "password-toggle"
            },
            {
              "kind": "field",
              "name": "passwordVisible",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Determines whether or not the password is currently visible. Only applies to password input types.",
              "attribute": "password-visible"
            },
            {
              "kind": "field",
              "name": "withoutSpinButtons",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Hides the browser's built-in increment/decrement spin buttons for number inputs.",
              "attribute": "without-spin-buttons",
              "reflects": true
            },
            {
              "kind": "field",
              "name": "required",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Makes the input a required field.",
              "attribute": "required",
              "reflects": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "pattern",
              "type": {
                "text": "string"
              },
              "description": "A regular expression pattern to validate input against.",
              "attribute": "pattern"
            },
            {
              "kind": "field",
              "name": "minlength",
              "type": {
                "text": "number"
              },
              "description": "The minimum length of input that will be considered valid.",
              "attribute": "minlength"
            },
            {
              "kind": "field",
              "name": "maxlength",
              "type": {
                "text": "number"
              },
              "description": "The maximum length of input that will be considered valid.",
              "attribute": "maxlength"
            },
            {
              "kind": "field",
              "name": "min",
              "type": {
                "text": "number | string"
              },
              "description": "The input's minimum value. Only applies to date and number input types.",
              "attribute": "min"
            },
            {
              "kind": "field",
              "name": "max",
              "type": {
                "text": "number | string"
              },
              "description": "The input's maximum value. Only applies to date and number input types.",
              "attribute": "max"
            },
            {
              "kind": "field",
              "name": "step",
              "type": {
                "text": "number | 'any'"
              },
              "description": "Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is\nimplied, allowing any numeric value. Only applies to date and number input types.",
              "attribute": "step"
            },
            {
              "kind": "field",
              "name": "autocapitalize",
              "type": {
                "text": "'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'"
              },
              "description": "Controls whether and how text input is automatically capitalized as it is entered by the user.",
              "attribute": "autocapitalize"
            },
            {
              "kind": "field",
              "name": "autocorrect",
              "type": {
                "text": "boolean"
              },
              "description": "Indicates whether the browser's autocorrect feature is on or off. When set as an attribute, use `\"off\"` or `\"on\"`.\nWhen set as a property, use `true` or `false`.",
              "attribute": "autocorrect"
            },
            {
              "kind": "field",
              "name": "autocomplete",
              "type": {
                "text": "string"
              },
              "description": "Specifies what permission the browser has to provide assistance in filling out form field values. Refer to\n[this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.",
              "attribute": "autocomplete"
            },
            {
              "kind": "field",
              "name": "autofocus",
              "type": {
                "text": "boolean"
              },
              "description": "Indicates that the input should receive focus on page load.",
              "attribute": "autofocus"
            },
            {
              "kind": "field",
              "name": "enterkeyhint",
              "type": {
                "text": "'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'"
              },
              "description": "Used to customize the label or icon of the Enter key on virtual keyboards.",
              "attribute": "enterkeyhint"
            },
            {
              "kind": "field",
              "name": "spellcheck",
              "type": {
                "text": "boolean"
              },
              "default": "true",
              "description": "Enables spell checking on the input.",
              "attribute": "spellcheck"
            },
            {
              "kind": "field",
              "name": "inputmode",
              "type": {
                "text": "'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'"
              },
              "description": "Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual\nkeyboard on supportive devices.",
              "attribute": "inputmode"
            },
            {
              "kind": "field",
              "name": "withLabel",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup\nincludes the label before the component hydrates on the client.",
              "attribute": "with-label"
            },
            {
              "kind": "field",
              "name": "withHint",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup\nincludes the hint before the component hydrates on the client.",
              "attribute": "with-hint"
            },
            {
              "kind": "method",
              "name": "handleChange",
              "privacy": "private",
              "parameters": [
                {
                  "name": "event",
                  "type": {
                    "text": "Event"
                  }
                }
              ]
            },
            {
              "kind": "method",
              "name": "handleClearClick",
              "privacy": "private",
              "parameters": [
                {
                  "name": "event",
                  "type": {
                    "text": "MouseEvent"
                  }
                }
              ]
            },
            {
              "kind": "method",
              "name": "handleInput",
              "privacy": "private"
            },
            {
              "kind": "method",
              "name": "handleKeyDown",
              "privacy": "private",
              "parameters": [
                {
                  "name": "event",
                  "type": {
                    "text": "KeyboardEvent"
                  }
                }
              ]
            },
            {
              "kind": "method",
              "name": "handlePasswordToggle",
              "privacy": "private"
            },
            {
              "kind": "method",
              "name": "handleStepChange",
              "type": {
                "text": "handleStepChange() => void"
              }
            },
            {
              "kind": "method",
              "name": "focus",
              "parameters": [
                {
                  "name": "options",
                  "optional": true,
                  "type": {
                    "text": "FocusOptions"
                  }
                }
              ],
              "description": "Sets focus on the input.",
              "type": {
                "text": "focus(options?: FocusOptions) => void"
              }
            },
            {
              "kind": "method",
              "name": "blur",
              "description": "Removes focus from the input.",
              "type": {
                "text": "blur() => void"
              }
            },
            {
              "kind": "method",
              "name": "select",
              "description": "Selects all the text in the input.",
              "type": {
                "text": "select() => void"
              }
            },
            {
              "kind": "method",
              "name": "setSelectionRange",
              "parameters": [
                {
                  "name": "selectionStart",
                  "type": {
                    "text": "number"
                  }
                },
                {
                  "name": "selectionEnd",
                  "type": {
                    "text": "number"
                  }
                },
                {
                  "name": "selectionDirection",
                  "default": "'none'",
                  "type": {
                    "text": "'forward' | 'backward' | 'none'"
                  }
                }
              ],
              "description": "Sets the start and end positions of the text selection (0-based).",
              "type": {
                "text": "setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection: 'forward' | 'backward' | 'none' = 'none') => void"
              }
            },
            {
              "kind": "method",
              "name": "setRangeText",
              "parameters": [
                {
                  "name": "replacement",
                  "type": {
                    "text": "string"
                  }
                },
                {
                  "name": "start",
                  "optional": true,
                  "type": {
                    "text": "number"
                  }
                },
                {
                  "name": "end",
                  "optional": true,
                  "type": {
                    "text": "number"
                  }
                },
                {
                  "name": "selectMode",
                  "default": "'preserve'",
                  "type": {
                    "text": "'select' | 'start' | 'end' | 'preserve'"
                  }
                }
              ],
              "description": "Replaces a range of text with a new string.",
              "type": {
                "text": "setRangeText(replacement: string, start?: number, end?: number, selectMode: 'select' | 'start' | 'end' | 'preserve' = 'preserve') => void"
              }
            },
            {
              "kind": "method",
              "name": "showPicker",
              "description": "Displays the browser picker for an input element (only works if the browser supports it for the input type).",
              "type": {
                "text": "showPicker() => void"
              }
            },
            {
              "kind": "method",
              "name": "stepUp",
              "description": "Increments the value of a numeric input type by the value of the step attribute.",
              "type": {
                "text": "stepUp() => void"
              }
            },
            {
              "kind": "method",
              "name": "stepDown",
              "description": "Decrements the value of a numeric input type by the value of the step attribute.",
              "type": {
                "text": "stepDown() => void"
              }
            },
            {
              "kind": "method",
              "name": "formResetCallback",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "formResetCallback() => void"
              }
            },
            {
              "kind": "field",
              "name": "formAssociated",
              "type": {
                "text": "boolean"
              },
              "static": true,
              "default": "true",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "name",
              "type": {
                "text": "string | null"
              },
              "default": "null",
              "description": "The name of the input, submitted as a name/value pair with form data.",
              "attribute": "name",
              "reflects": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "disabled",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Disables the form control.",
              "attribute": "disabled",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "valueHasChanged",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "hasInteracted",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "customError",
              "type": {
                "text": "string | null"
              },
              "default": "null",
              "attribute": "custom-error",
              "reflects": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "emittedEvents",
              "type": {
                "text": "string[]"
              },
              "privacy": "private",
              "default": "[]",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "states",
              "type": {
                "text": "CustomStateSet"
              },
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "emitInvalid",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "handleInteraction",
              "privacy": "private",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "labels",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "method",
              "name": "getForm",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "getForm() => void"
              }
            },
            {
              "kind": "field",
              "name": "form",
              "description": "By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you\nto place the form control outside of a form and associate it with the form that has this `id`. The form must be in\nthe same document or shadow root for this to work.",
              "type": {
                "text": "HTMLFormElement | null"
              },
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "validity",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "willValidate",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "field",
              "name": "validationMessage",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "method",
              "name": "checkValidity",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "checkValidity() => void"
              }
            },
            {
              "kind": "method",
              "name": "reportValidity",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "reportValidity() => void"
              }
            },
            {
              "kind": "field",
              "name": "validationTarget",
              "type": {
                "text": "undefined | HTMLElement"
              },
              "description": "Override this to change where constraint validation popups are anchored.",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "method",
              "name": "setValidity",
              "parameters": [
                {
                  "name": "args",
                  "type": {
                    "text": "Parameters<typeof this.internals.setValidity>"
                  }
                }
              ],
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "setValidity(args: Parameters<typeof this.internals.setValidity>) => void"
              }
            },
            {
              "kind": "method",
              "name": "setCustomStates",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "setCustomStates() => void"
              }
            },
            {
              "kind": "method",
              "name": "setCustomValidity",
              "parameters": [
                {
                  "name": "message",
                  "type": {
                    "text": "string"
                  }
                }
              ],
              "description": "Do not use this when creating a \"Validator\". This is intended for end users of components.\nWe track manually defined custom errors so we don't clear them on accident in our validators.",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "setCustomValidity(message: string) => void"
              }
            },
            {
              "kind": "method",
              "name": "formDisabledCallback",
              "parameters": [
                {
                  "name": "isDisabled",
                  "type": {
                    "text": "boolean"
                  }
                }
              ],
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "formDisabledCallback(isDisabled: boolean) => void"
              }
            },
            {
              "kind": "method",
              "name": "formStateRestoreCallback",
              "parameters": [
                {
                  "name": "state",
                  "type": {
                    "text": "string | File | FormData | null"
                  }
                },
                {
                  "name": "reason",
                  "type": {
                    "text": "'autocomplete' | 'restore'"
                  }
                }
              ],
              "description": "Called when the browser is trying to restore element’s state to state in which case reason is \"restore\", or when\nthe browser is trying to fulfill autofill on behalf of user in which case reason is \"autocomplete\". In the case of\n\"restore\", state is a string, File, or FormData object previously set as the second argument to setFormValue.",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "formStateRestoreCallback(state: string | File | FormData | null, reason: 'autocomplete' | 'restore') => void"
              }
            },
            {
              "kind": "method",
              "name": "setValue",
              "parameters": [
                {
                  "name": "args",
                  "type": {
                    "text": "Parameters<typeof this.internals.setFormValue>"
                  }
                }
              ],
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "setValue(args: Parameters<typeof this.internals.setFormValue>) => void"
              }
            },
            {
              "kind": "field",
              "name": "allValidators",
              "readonly": true,
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              }
            },
            {
              "kind": "method",
              "name": "resetValidity",
              "description": "Reset validity is a way of removing manual custom errors and native validation.",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "resetValidity() => void"
              }
            },
            {
              "kind": "method",
              "name": "updateValidity",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "internal/webawesome-form-associated-element.js"
              },
              "type": {
                "text": "updateValidity() => void"
              }
            },
            {
              "kind": "field",
              "name": "#hasRecordedInitialProperties",
              "privacy": "private",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "initialReflectedProperties",
              "type": {
                "text": "Map<string, unknown>"
              },
              "default": "new Map()",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "internals",
              "type": {
                "text": "ElementInternals"
              },
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "dir",
              "type": {
                "text": "string"
              },
              "attribute": "dir",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "lang",
              "type": {
                "text": "string"
              },
              "attribute": "lang",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            },
            {
              "kind": "field",
              "name": "didSSR",
              "attribute": "did-ssr",
              "reflects": true,
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "internal/webawesome-element.js"
              }
            }
          ],
          "events": [
            {
              "name": "input",
              "type": {
                "text": "InputEvent"
              },
              "description": "Emitted when the control receives input.",
              "reactName": "onInput",
              "eventName": "InputEvent"
            },
            {
              "name": "change",
              "type": {
                "text": "Event"
              },
              "description": "Emitted when an alteration to the control's value is committed by the user.",
              "reactName": "onChange",
              "eventName": "ChangeEvent"
            },
            {
              "description": "Emitted when the control loses focus.",
              "name": "blur",
              "reactName": "onBlur",
              "eventName": "BlurEvent"
            },
            {
              "description": "Emitted when the control gains focus.",
              "name": "focus",
              "reactName": "onFocus",
              "eventName": "FocusEvent"
            },
            {
              "description": "Emitted when the clear button is activated.",
              "name": "wa-clear",
              "reactName": "onWaClear",
              "eventName": "WaClearEvent"
            },
            {
              "description": "Emitted when the form control has been checked for validity and its constraints aren't satisfied.",
              "name": "wa-invalid",
              "reactName": "onWaInvalid",
              "eventName": "WaInvalidEvent"
            }
          ],
          "attributes": [
            {
              "name": "title",
              "type": {
                "text": "string"
              },
              "default": "''",
              "fieldName": "title"
            },
            {
              "name": "type",
              "type": {
                "text": "| 'date'\n    | 'datetime-local'\n    | 'email'\n    | 'number'\n    | 'password'\n    | 'search'\n    | 'tel'\n    | 'text'\n    | 'time'\n    | 'url'"
              },
              "default": "'text'",
              "description": "The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. Defaults\nto `text`.",
              "fieldName": "type",
              "parsedType": {
                "text": "'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url'"
              }
            },
            {
              "name": "value",
              "type": {
                "text": "string | null"
              },
              "description": "The default value of the form control. Primarily used for resetting the form control.",
              "fieldName": "defaultValue"
            },
            {
              "name": "size",
              "type": {
                "text": "'xs' | 's' | 'm' | 'l' | 'xl' | 'small' | 'medium' | 'large'"
              },
              "default": "'m'",
              "description": "The input's size.",
              "fieldName": "size"
            },
            {
              "name": "appearance",
              "type": {
                "text": "'filled' | 'outlined' | 'filled-outlined'"
              },
              "default": "'outlined'",
              "description": "The input's visual appearance.",
              "fieldName": "appearance"
            },
            {
              "name": "pill",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Draws a pill-style input with rounded edges.",
              "fieldName": "pill"
            },
            {
              "name": "label",
              "type": {
                "text": "string"
              },
              "default": "''",
              "description": "The input's label. If you need to display HTML, use the `label` slot instead.",
              "fieldName": "label"
            },
            {
              "name": "hint",
              "type": {
                "text": "string"
              },
              "default": "''",
              "description": "The input's hint. If you need to display HTML, use the `hint` slot instead.",
              "fieldName": "hint"
            },
            {
              "name": "with-clear",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Adds a clear button when the input is not empty.",
              "fieldName": "withClear"
            },
            {
              "name": "placeholder",
              "type": {
                "text": "string"
              },
              "default": "''",
              "description": "Placeholder text to show as a hint when the input is empty.",
              "fieldName": "placeholder"
            },
            {
              "name": "readonly",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Makes the input readonly.",
              "fieldName": "readonly"
            },
            {
              "name": "password-toggle",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Adds a button to toggle the password's visibility. Only applies to password types.",
              "fieldName": "passwordToggle"
            },
            {
              "name": "password-visible",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Determines whether or not the password is currently visible. Only applies to password input types.",
              "fieldName": "passwordVisible"
            },
            {
              "name": "without-spin-buttons",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Hides the browser's built-in increment/decrement spin buttons for number inputs.",
              "fieldName": "withoutSpinButtons"
            },
            {
              "name": "required",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Makes the input a required field.",
              "fieldName": "required"
            },
            {
              "name": "pattern",
              "type": {
                "text": "string"
              },
              "description": "A regular expression pattern to validate input against.",
              "fieldName": "pattern"
            },
            {
              "name": "minlength",
              "type": {
                "text": "number"
              },
              "description": "The minimum length of input that will be considered valid.",
              "fieldName": "minlength"
            },
            {
              "name": "maxlength",
              "type": {
                "text": "number"
              },
              "description": "The maximum length of input that will be considered valid.",
              "fieldName": "maxlength"
            },
            {
              "name": "min",
              "type": {
                "text": "number | string"
              },
              "description": "The input's minimum value. Only applies to date and number input types.",
              "fieldName": "min"
            },
            {
              "name": "max",
              "type": {
                "text": "number | string"
              },
              "description": "The input's maximum value. Only applies to date and number input types.",
              "fieldName": "max"
            },
            {
              "name": "step",
              "type": {
                "text": "number | 'any'"
              },
              "description": "Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is\nimplied, allowing any numeric value. Only applies to date and number input types.",
              "fieldName": "step"
            },
            {
              "name": "autocapitalize",
              "type": {
                "text": "'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'"
              },
              "description": "Controls whether and how text input is automatically capitalized as it is entered by the user.",
              "fieldName": "autocapitalize"
            },
            {
              "name": "autocorrect",
              "type": {
                "text": "boolean"
              },
              "description": "Indicates whether the browser's autocorrect feature is on or off. When set as an attribute, use `\"off\"` or `\"on\"`.\nWhen set as a property, use `true` or `false`.",
              "fieldName": "autocorrect"
            },
            {
              "name": "autocomplete",
              "type": {
                "text": "string"
              },
              "description": "Specifies what permission the browser has to provide assistance in filling out form field values. Refer to\n[this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.",
              "fieldName": "autocomplete"
            },
            {
              "name": "autofocus",
              "type": {
                "text": "boolean"
              },
              "description": "Indicates that the input should receive focus on page load.",
              "fieldName": "autofocus"
            },
            {
              "name": "enterkeyhint",
              "type": {
                "text": "'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'"
              },
              "description": "Used to customize the label or icon of the Enter key on virtual keyboards.",
              "fieldName": "enterkeyhint"
            },
            {
              "name": "spellcheck",
              "type": {
                "text": "boolean"
              },
              "default": "true",
              "description": "Enables spell checking on the input.",
              "fieldName": "spellcheck"
            },
            {
              "name": "inputmode",
              "type": {
                "text": "'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'"
              },
              "description": "Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual\nkeyboard on supportive devices.",
              "fieldName": "inputmode"
            },
            {
              "name": "with-label",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup\nincludes the label before the component hydrates on the client.",
              "fieldName": "withLabel"
            },
            {
              "name": "with-hint",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup\nincludes the hint before the component hydrates on the client.",
              "fieldName": "withHint"
            },
            {
              "name": "name",
              "type": {
                "text": "string | null"
              },
              "default": "null",
              "description": "The name of the input, submitted as a name/value pair with form data.",
              "fieldName": "name",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "src/internal/webawesome-form-associated-element.ts"
              }
            },
            {
              "name": "disabled",
              "type": {
                "text": "boolean"
              },
              "default": "false",
              "description": "Disables the form control.",
              "fieldName": "disabled",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "src/internal/webawesome-form-associated-element.ts"
              }
            },
            {
              "name": "custom-error",
              "type": {
                "text": "string | null"
              },
              "default": "null",
              "fieldName": "customError",
              "inheritedFrom": {
                "name": "WebAwesomeFormAssociatedElement",
                "module": "src/internal/webawesome-form-associated-element.ts"
              }
            },
            {
              "name": "dir",
              "type": {
                "text": "string"
              },
              "fieldName": "dir",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "src/internal/webawesome-element.ts"
              }
            },
            {
              "name": "lang",
              "type": {
                "text": "string"
              },
              "fieldName": "lang",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "src/internal/webawesome-element.ts"
              }
            },
            {
              "name": "did-ssr",
              "fieldName": "didSSR",
              "inheritedFrom": {
                "name": "WebAwesomeElement",
                "module": "src/internal/webawesome-element.ts"
              }
            }
          ],
          "cssStates": [
            {
              "description": "The input is empty.",
              "name": "blank"
            }
          ],
          "superclass": {
            "name": "WebAwesomeFormAssociatedElement",
            "module": "/src/internal/webawesome-form-associated-element.js"
          },
          "summary": "Inputs collect single-line data from the user, such as text, numbers, email addresses, and passwords. They\nsupport labels, hints, validation, and prefix or suffix slots.",
          "jsDoc": "/**\n * @summary Inputs collect single-line data from the user, such as text, numbers, email addresses, and passwords. They\n *  support labels, hints, validation, and prefix or suffix slots.\n * @documentation https://webawesome.com/docs/components/input\n * @status stable\n * @since 2.0\n *\n * @dependency wa-icon\n *\n * @slot label - The input's label. Alternatively, you can use the `label` attribute.\n * @slot start - An element, such as `<wa-icon>`, placed at the start of the input control.\n * @slot end - An element, such as `<wa-icon>`, placed at the end of the input control.\n * @slot clear-icon - An icon to use in lieu of the default clear icon.\n * @slot show-password-icon - An icon to use in lieu of the default show password icon.\n * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.\n * @slot hint - Text that describes how to use the input. Alternatively, you can use the `hint` attribute.\n *\n * @event blur - Emitted when the control loses focus.\n * @event change - Emitted when an alteration to the control's value is committed by the user.\n * @event focus - Emitted when the control gains focus.\n * @event input - Emitted when the control receives input.\n * @event wa-clear - Emitted when the clear button is activated.\n * @event wa-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.\n *\n * @csspart label - The label\n * @csspart hint - The hint's wrapper.\n * @csspart base - The wrapper being rendered as an input\n * @csspart input - The internal `<input>` control.\n * @csspart start - The container that wraps the `start` slot.\n * @csspart clear-button - The clear button.\n * @csspart password-toggle-button - The password toggle button.\n * @csspart end - The container that wraps the `end` slot.\n *\n * @cssstate blank - The input is empty.\n */",
          "documentation": "https://webawesome.com/docs/components/input",
          "status": "stable",
          "since": "2.0",
          "dependencies": [
            "wa-icon"
          ],
          "tagName": "wa-input",
          "customElement": true,
          "modulePath": "components/input/input.js",
          "definitionPath": "components/input/input.js"
        }
      ]
    }
  ]
} as const;
