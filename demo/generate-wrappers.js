import { generateReactWrappers } from "../dist/index.js";
import manifest from "./shoelace-cem.json" with { type: "json" };

generateReactWrappers(manifest, {
  outdir: "./demo/wrappers",
  scopedTags: true,
  componentNameFormatter: (_, name) => name.replace('Sl', ''),
  stronglyTypedEvents: true,
});
