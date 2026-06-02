import "@awesome.me/webawesome/dist/styles/webawesome.css";

import manifest from "@awesome.me/webawesome/dist/custom-elements.json";

// Static component import to keep bundling explicit and lean.
import WaButton from "@awesome.me/webawesome/dist/components/button/button.js";
import WaInput from "@awesome.me/webawesome/dist/components/input/input.js";

import { wrapperSetup } from "../../../src/runtime-wrapper.ts";

export const createWrapper = wrapperSetup(manifest);

export { WaButton, WaInput };
