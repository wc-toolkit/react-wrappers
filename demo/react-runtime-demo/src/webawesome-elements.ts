export const WA_BUTTON_TAG = "wa-button" as const;
export const WA_EXTENDED_TAG = "wa-extended-button" as const;

export class WebAwesomeButton extends HTMLElement {
  static get observedAttributes() {
    return ["label", "active"];
  }

  #label = "Awesome";
  #value = "idle";
  #active = false;

  get value() {
    return this.#value;
  }

  set value(v: string) {
    this.#value = v;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string, _old: string | null, newValue: string | null) {
    if (name === "label") this.#label = newValue ?? "";
    if (name === "active") this.#active = newValue !== null;
    this.render();
  }

  private emitClick = () => {
    this.dispatchEvent(
      new CustomEvent("wa-click", { detail: { value: this.#value }, bubbles: true }),
    );
  };

  protected render() {
    this.innerHTML = `<button type=button>${this.#label} | value=${this.#value} | ${this.#active ? "active" : "inactive"}</button>`;
    this.querySelector("button")?.addEventListener("click", this.emitClick);
  }
}

export class ExtendedWebAwesomeButton extends WebAwesomeButton {
  // additional property present on the extended element
  #extra = "none";

  get extra() {
    return this.#extra;
  }

  set extra(value: string) {
    this.#extra = value;
    this.render();
  }

  // emit a different event to demonstrate extended behavior
  private emitExtended = () => {
    this.dispatchEvent(
      new CustomEvent("wa-extended", { detail: { extra: this.#extra }, bubbles: true }),
    );
  };

  // override render to wire up extended click
  protected render() {
    this.innerHTML = `<button type=button>Extended: ${this.extra}</button>`;
    this.querySelector("button")?.addEventListener("click", this.emitExtended);
  }
}

if (typeof customElements !== "undefined") {
  if (!customElements.get(WA_BUTTON_TAG)) {
    customElements.define(WA_BUTTON_TAG, WebAwesomeButton);
  }

  if (!customElements.get(WA_EXTENDED_TAG)) {
    customElements.define(WA_EXTENDED_TAG, ExtendedWebAwesomeButton);
  }
}
