// @vitest-environment jsdom

import React, { createRef } from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { wrapComponent, wrapperSetup } from "./runtime-wrapper";
import type { RuntimeManifest } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

class RuntimeWrapperElement extends HTMLElement {
  value = "";
}

class AutoPropertyElement extends HTMLElement {
  #status = "";

  get status() {
    return this.#status;
  }

  set status(value: string) {
    this.#status = value;
  }
}

class ExtendedRuntimeElement extends RuntimeWrapperElement {}

if (!customElements.get("runtime-wrapper-element")) {
  customElements.define("runtime-wrapper-element", RuntimeWrapperElement);
}

if (!customElements.get("auto-property-element")) {
  customElements.define("auto-property-element", AutoPropertyElement);
}

if (!customElements.get("extended-runtime-element")) {
  customElements.define("extended-runtime-element", ExtendedRuntimeElement);
}

const manifest = {
  schemaVersion: "1.0.0",
  modules: [
    {
      kind: "javascript-module",
      path: "src/base-runtime-element.ts",
      declarations: [
        {
          kind: "class",
          name: "RuntimeWrapperElement",
          tagName: "runtime-wrapper-element",
          customElement: true,
          attributes: [
            {
              name: "readonly",
              fieldName: "readOnly",
              type: {
                text: "boolean",
              },
            },
            {
              name: "tone",
              type: {
                text: '"primary" | "secondary"',
              },
            },
          ],
          members: [
            {
              kind: "field",
              name: "value",
            },
          ],
          events: [
            {
              name: "ready",
            },
          ],
        },
      ],
    },
  ],
} as const satisfies RuntimeManifest;

function assertManifestSetupTypes() {
  const configuredWrap = wrapperSetup(manifest);

  configuredWrap("extended-runtime-element", ExtendedRuntimeElement, {
    extends: "RuntimeWrapperElement",
  });

  configuredWrap("extended-runtime-element", ExtendedRuntimeElement, {
    // @ts-expect-error invalid manifest class names should be rejected
    extends: "MissingElement",
  });
}

void assertManifestSetupTypes;

function assertEventDetailTypes() {
  const WrappedElement = wrapComponent<
    typeof RuntimeWrapperElement,
    {
      onReady: {
        name: "ready";
        detail: { status: string };
      };
    }
  >("runtime-wrapper-element", RuntimeWrapperElement, {
    events: {
      onReady: { name: "ready" },
    },
  });

  React.createElement(WrappedElement, {
    onReady: (event) => {
      const status = event.detail.status;
      void status;
    },
  });

  React.createElement(WrappedElement, {
    // @ts-expect-error detail.status is string
    onReady: (event) => event.detail.status.toFixed(2),
  });
}

void assertEventDetailTypes;

function renderIntoContainer(element: React.ReactElement) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);

  act(() => {
    root.render(element);
  });

  return { container, root };
}

describe("runtime wrappers", () => {
  let container: HTMLDivElement | undefined;
  let root: Root | undefined;

  afterEach(() => {
    if (root) {
      act(() => {
        root?.unmount();
      });
    }

    root = undefined;
    container?.remove();
    container = undefined;
  });

  it("maps explicit attributes, properties, events, and refs", () => {
    const onReady = vi.fn();
    const ref = createRef<RuntimeWrapperElement>();
    const WrappedElement = wrapComponent(
      "runtime-wrapper-element",
      RuntimeWrapperElement,
      {
        events: {
          onReady: "ready",
        },
        properties: ["value"],
        booleanAttributes: ["active"] as const,
      },
    );

    ({ container, root } = renderIntoContainer(
      React.createElement(WrappedElement, {
        ref,
        className: "ready",
        htmlFor: "field-id",
        value: "loaded",
        active: true,
        onReady,
      }),
    ));

    const element = container.querySelector(
      "runtime-wrapper-element",
    ) as RuntimeWrapperElement | null;

    expect(WrappedElement.displayName).toBe("RuntimeWrapperElement");
    expect(element).not.toBeNull();
    expect(ref.current).toBe(element);
    expect(element?.getAttribute("class")).toBe("ready");
    expect(element?.getAttribute("for")).toBe("field-id");
    expect(element?.hasAttribute("active")).toBe(true);
    expect(element?.getAttribute("value")).toBeNull();
    expect(element?.value).toBe("loaded");

    act(() => {
      element?.dispatchEvent(new CustomEvent("ready"));
    });

    expect(onReady).toHaveBeenCalledTimes(1);
  });

  it("derives property assignment from the class prototype when no manifest is available", () => {
    const WrappedElement = wrapComponent(
      "auto-property-element",
      AutoPropertyElement,
    );

    ({ container, root } = renderIntoContainer(
      React.createElement(WrappedElement, {
        status: "loaded",
      }),
    ));

    const element = container.querySelector(
      "auto-property-element",
    ) as AutoPropertyElement | null;

    expect(element?.getAttribute("status")).toBeNull();
    expect(element?.status).toBe("loaded");
  });

  it("uses manifest defaults and supports extends overrides", () => {
    const configuredWrap = wrapperSetup(manifest);
    const onReady = vi.fn();
    const WrappedElement = configuredWrap(
      "extended-runtime-element",
      ExtendedRuntimeElement,
      {
        extends: "RuntimeWrapperElement",
      },
    );

    ({ container, root } = renderIntoContainer(
      React.createElement(WrappedElement, {
        readOnly: true,
        tone: "primary",
        value: "derived",
        onReady,
      }),
    ));

    const element = container.querySelector(
      "extended-runtime-element",
    ) as ExtendedRuntimeElement | null;

    expect(WrappedElement.displayName).toBe("RuntimeWrapperElement");
    expect(element?.hasAttribute("readonly")).toBe(true);
    expect(element?.getAttribute("tone")).toBe("primary");
    expect(element?.getAttribute("value")).toBeNull();
    expect(element?.value).toBe("derived");

    act(() => {
      element?.dispatchEvent(new CustomEvent("ready"));
    });

    expect(onReady).toHaveBeenCalledTimes(1);
  });
});
