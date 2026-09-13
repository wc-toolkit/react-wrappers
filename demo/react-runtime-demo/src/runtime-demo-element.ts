import { wrapComponent } from "../../../src/runtime-wrapper";

export const RUNTIME_DEMO_TAG = "runtime-demo-element" as const;

export class RuntimeDemoElement extends HTMLElement {
  static get observedAttributes() {
    return ["active", "label"];
  }

  #label = "Runtime Wrapper";
  #value = "idle";
  #active = false;

  get value() {
    return this.#value;
  }

  set value(nextValue: string) {
    this.#value = nextValue;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "active") {
      this.#active = newValue !== null;
    } else if (name === "label") {
      this.#label = newValue ?? "";
    }

    this.render();
  }

  private emitChange = () => {
    const nextValue = this.#active ? "active-click" : "inactive-click";
    this.dispatchEvent(
      new CustomEvent("demo-change", {
        detail: { value: nextValue },
        bubbles: true,
      }),
    );
  };

  private render() {
    this.innerHTML = `
      <button type="button">
        ${this.#label} | value=${this.#value} | ${
          this.#active ? "active" : "inactive"
        }
      </button>
    `;

    this.querySelector("button")?.addEventListener("click", this.emitChange);
  }
}

export const RuntimeDemoWrapper = wrapComponent(RUNTIME_DEMO_TAG, RuntimeDemoElement, {
  events: {
    onDemoChange: "demo-change",
  },
  properties: ["value"],
  attributes: ["label"],
  booleanAttributes: ["active"] as const,
});
