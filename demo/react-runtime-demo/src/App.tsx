import { useMemo, useRef, useState } from "react";
import { RuntimeDemoWrapper, RuntimeDemoElement } from "./runtime-demo-element";
import { WaButton, WaInput } from "./webawesome";
import { WebAwesomeInput } from "./wa-input";
import "./App.css";
import { ExtendedWebAwesomeButton, WebAwesomeButton } from "./wa-extended-button";

type WaAppearance = WaButton["appearance"];
const WA_APPEARANCES: readonly WaAppearance[] = [
  "plain",
  "accent",
  "filled",
  "outlined",
  "filled-outlined",
];

type WaInputAppearance = WaInput["appearance"];
const WA_INPUT_APPEARANCES: readonly WaInputAppearance[] = [
  "filled",
  "outlined",
  "filled-outlined",
];

function App() {
  const wrapperRef = useRef<RuntimeDemoElement | null>(null);

  const [label, setLabel] = useState("Runtime Wrapper");
  const [value, setValue] = useState("idle");
  const [active, setActive] = useState(false);
  const [lastEvent, setLastEvent] = useState("none");

  const [waText, setWaText] = useState("WebAwesome Button");
  const [waAppearance, setWaAppearance] = useState<WaAppearance>("plain");
  const [waPill, setWaPill] = useState(true);

  const [extendedCount, setExtendedCount] = useState(0);

  const [waInputLabel, setWaInputLabel] = useState("WA Input");
  const [waInputPlaceholder, setWaInputPlaceholder] = useState("Type here...");
  const [waInputValue, setWaInputValue] = useState("hello");
  const [waInputAppearance, setWaInputAppearance] =
    useState<WaInputAppearance>("outlined");
  const [waInputPill, setWaInputPill] = useState(false);
  const [waInputWithClear, setWaInputWithClear] = useState(true);
  const [waInputDisabled, setWaInputDisabled] = useState(false);

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
          <input
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />
        </label>

        <label>
          Value (property)
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
          />
          Active (boolean attribute)
        </label>

        <label>
          WA text
          <input
            value={waText}
            onChange={(event) => setWaText(event.target.value)}
          />
        </label>

        <label>
          WA appearance
          <select
            value={waAppearance}
            onChange={(event) =>
              setWaAppearance(event.target.value as WaAppearance)
            }
          >
            {WA_APPEARANCES.map((appearance) => (
              <option key={appearance} value={appearance}>
                {appearance}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={waPill}
            onChange={(event) => setWaPill(event.target.checked)}
          />
          WA pill
        </label>

        <button
          type="button"
          onClick={() => setExtendedCount(0)}
          style={{ alignSelf: "end" }}
        >
          Reset extended count
        </button>

        <label>
          WA input label
          <input
            value={waInputLabel}
            onChange={(event) => setWaInputLabel(event.target.value)}
          />
        </label>

        <label>
          WA input placeholder
          <input
            value={waInputPlaceholder}
            onChange={(event) => setWaInputPlaceholder(event.target.value)}
          />
        </label>

        <label>
          WA input value
          <input
            value={waInputValue}
            onChange={(event) => setWaInputValue(event.target.value)}
          />
        </label>

        <label>
          WA input appearance
          <select
            value={waInputAppearance}
            onChange={(event) =>
              setWaInputAppearance(event.target.value as WaInputAppearance)
            }
          >
            {WA_INPUT_APPEARANCES.map((appearance) => (
              <option key={appearance} value={appearance}>
                {appearance}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={waInputPill}
            onChange={(event) => setWaInputPill(event.target.checked)}
          />
          WA input pill
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={waInputWithClear}
            onChange={(event) => setWaInputWithClear(event.target.checked)}
          />
          WA input withClear
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={waInputDisabled}
            onChange={(event) => setWaInputDisabled(event.target.checked)}
          />
          WA input disabled
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

        <h2>WebAwesome wa-button (wrapped)</h2>
        <WebAwesomeButton
          appearance={waAppearance}
          pill={waPill}
          onClick={() => setLastEvent("wa-button:click")}
        >
          {waText}
        </WebAwesomeButton>

        <h2>Extended WebAwesome button (wrapped)</h2>
        <ExtendedWebAwesomeButton
          appearance={waAppearance}
          pill={waPill}
          count={extendedCount}
          onWaeCount={(event) => {
            setExtendedCount(event.detail.count);
            setLastEvent(`wae-count:${event.detail.count}`);
          }}
        >
          Click count: {extendedCount}
        </ExtendedWebAwesomeButton>

        <h2>WebAwesome wa-input (wrapped)</h2>
        <WebAwesomeInput
          label={waInputLabel}
          hint="Emits input/change events and supports withClear."
          placeholder={waInputPlaceholder}
          appearance={waInputAppearance}
          pill={waInputPill}
          withClear={waInputWithClear}
          disabled={waInputDisabled}
          value={waInputValue}
          onInput={(event) => {
            const el = event.target as WaInput;
            const nextValue = el.value ?? "";
            setWaInputValue(nextValue);
            setLastEvent(`wa-input:input:${nextValue}`);
          }}
          onChange={(event) => {
            const el = event.target as WaInput;
            setLastEvent(`wa-input:change:${el.value ?? ""}`);
          }}
          onWaClear={() => {
            setWaInputValue("");
            setLastEvent("wa-input:wa-clear");
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
