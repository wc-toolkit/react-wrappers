// @vitest-environment jsdom

import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { wrapComponent } from "./runtime-wrapper";

declare global {
  // eslint-disable-next-line no-var
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

class RuntimeWrapperElement extends HTMLElement {
  value = "";
}

if (!customElements.get("runtime-wrapper-element")) {
  customElements.define("runtime-wrapper-element", RuntimeWrapperElement);
}

function renderIntoContainer(element: React.ReactElement) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);

  act(() => {
    root.render(element);
  });

  return { container, root };
}

describe("runtime wrapper strict mode", () => {
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

  it("does not forward unknown props in strict mode (default)", () => {
    const WrappedElement = wrapComponent(
      "runtime-wrapper-element",
      RuntimeWrapperElement,
      { properties: ["value"] },
    );

    ({ container, root } = renderIntoContainer(
      React.createElement(WrappedElement, {
        value: "foo",
        unknownProp: "should-not-appear",
      }),
    ));

    const element = container.querySelector(
      "runtime-wrapper-element",
    ) as RuntimeWrapperElement | null;

    expect(element).not.toBeNull();
    expect(element?.hasAttribute("unknownProp")).toBe(false);
    expect(element?.getAttribute("unknownProp")).toBeNull();
  });

  it("forwards unknown primitive props in non-strict mode", () => {
    const WrappedElement = wrapComponent(
      "runtime-wrapper-element",
      RuntimeWrapperElement,
      { properties: ["value"], strict: false },
    );

    ({ container, root } = renderIntoContainer(
      React.createElement(WrappedElement, {
        value: "foo",
        unknownProp: "should-appear",
      }),
    ));

    const element = container.querySelector(
      "runtime-wrapper-element",
    ) as RuntimeWrapperElement | null;

    expect(element).not.toBeNull();
    expect(element?.hasAttribute("unknownProp")).toBe(true);
    expect(element?.getAttribute("unknownProp")).toBe("should-appear");
  });

  it("does not serialize unknown object props in non-strict mode", () => {
    const WrappedElement = wrapComponent(
      "runtime-wrapper-element",
      RuntimeWrapperElement,
      { properties: ["value"], strict: false },
    );

    ({ container, root } = renderIntoContainer(
      React.createElement(WrappedElement, {
        value: "foo",
        unknownObject: { foo: "bar" },
      }),
    ));

    const element = container.querySelector(
      "runtime-wrapper-element",
    ) as RuntimeWrapperElement | null;

    expect(element).not.toBeNull();
    expect(element?.hasAttribute("unknownObject")).toBe(false);
    expect(element?.getAttribute("unknownObject")).toBeNull();
  });
});
