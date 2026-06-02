import { useMemo, useRef, useState } from "react";
import { wrapComponent } from "../../../src/runtime-wrapper.ts";
import { RUNTIME_DEMO_TAG, RuntimeDemoElement } from "./runtime-demo-element";
import {
  WA_BUTTON_TAG,
  WA_EXTENDED_TAG,
  WebAwesomeButton,
  ExtendedWebAwesomeButton,
} from "./webawesome-elements";
import "./App.css";

const RuntimeDemoWrapper = wrapComponent(RUNTIME_DEMO_TAG, RuntimeDemoElement, {
  events: {
    onDemoChange: "demo-change",
  },
  properties: ["value"],
  attributes: ["label"],
  booleanAttributes: ["active"] as const,
});

const WAButton = wrapComponent(WA_BUTTON_TAG, WebAwesomeButton, {
  events: { onWaClick: "wa-click" },
  properties: ["value"],
  attributes: ["label"],
  booleanAttributes: ["active"] as const,
});

const WAExtended = wrapComponent(WA_EXTENDED_TAG, ExtendedWebAwesomeButton, {
  events: { onWaExtended: "wa-extended" },
  properties: ["value", "extra"],
  attributes: ["label", "variant"],
});

function App() {
  const wrapperRef = useRef<RuntimeDemoElement | null>(null);
  const waRef = useRef<WebAwesomeButton | null>(null);
  const waeRef = useRef<ExtendedWebAwesomeButton | null>(null);

  const [label, setLabel] = useState("Runtime Wrapper");
  const [value, setValue] = useState("idle");
  const [active, setActive] = useState(false);
  const [lastEvent, setLastEvent] = useState("none");
  const [extra, setExtra] = useState("blue");

  const refState = useMemo(
    () => ({
      tag: wrapperRef.current?.tagName ?? "null",
      value: wrapperRef.current?.value ?? "null",
    }),
    [value],
  );

  return (
    <main className="app">
      <h1>Runtime Wrapper Demo</h1>

      <div className="controls">
        <label>
          Label
          <input value={label} onChange={(event) => setLabel(event.target.value)} />
        </label>

        <label>
          Value (property)
          <input value={value} onChange={(event) => setValue(event.target.value)} />
        </label>

        <label className="checkbox">
          <input type="checkbox" checked={active} onChange={(event) => setActive(event.target.checked)} />
          Active (boolean attribute)
        </label>

        <label>
          Extended extra
          <input value={extra} onChange={(e) => setExtra(e.target.value)} />
        </label>
      </div>

      <section className="preview">
        <h2>Original runtime demo element</h2>
        <RuntimeDemoWrapper
          ref={wrapperRef}
          label={label}
          value={value}
          active={active}
          onDemoChange={(event) => {
            const detail = (event as CustomEvent<{ value: string }>).detail;
            setLastEvent(detail.value);
            setValue(detail.value);
          }}
        />

        <h2>WebAwesome component (wrapped)</h2>
        <WAButton
          ref={waRef}
          label={"WA: " + label}
          value={value}
          active={active}
          onWaClick={(e) => {
            const d = (e as CustomEvent<{ value: string }>).detail;
            setLastEvent(`wa-click:${d.value}`);
          }}
        />

        <h2>Extended WebAwesome component (wrapped)</h2>
        <WAExtended
          ref={waeRef}
          label={"Ext: " + label}
          value={value}
          extra={extra}
          onWaExtended={(e) => {
            const d = (e as CustomEvent<{ extra: string }>).detail;
            setLastEvent(`wa-extended:${d.extra}`);
          }}
        />
      </section>

      <section className="status">
        <p>
          <strong>Last event value:</strong> {lastEvent}
        </p>
        <p>
          <strong>Ref element:</strong> {refState.tag}
        </p>
        <p>
          <strong>Ref property value:</strong> {refState.value}
        </p>
      </section>
    </main>
  );
}

export default App;
