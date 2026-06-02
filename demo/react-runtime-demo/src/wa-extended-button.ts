import { WaButton, createWrapper } from "./webawesome";

export const WA_EXTENDED_BUTTON_TAG = "wa-extended-button" as const;

export class WaExtendedButton extends WaButton {
  #count = 0;

  get count() {
    return this.#count;
  }

  set count(next: number) {
    this.#count = next;
  }

  #handleClick = () => {
    this.#count += 1;
    this.dispatchEvent(
      new CustomEvent("wae-count", {
        detail: { count: this.#count },
        bubbles: true,
      }),
    );
  };

  connectedCallback() {
    super.connectedCallback?.();
    this.addEventListener("click", this.#handleClick);
  }
}

export const WebAwesomeButton = createWrapper("wa-button", WaButton);

const extendedEvents = {
  onWaeCount: { name: "wae-count", detail: {} as { count: number } },
} as const;

export const ExtendedWebAwesomeButton = createWrapper(
  WA_EXTENDED_BUTTON_TAG,
  WaExtendedButton,
  {
    extends: "WaButton",
    events: extendedEvents,
    properties: ["count"],
  },
);
