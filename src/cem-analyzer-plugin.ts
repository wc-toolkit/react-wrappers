import { generateReactWrappers } from "./wrapper-generator";
import type { ReactWrapperOptions } from "./types";
import type { Plugin } from "@wc-toolkit/cem-generator";
import type { Package } from "custom-elements-manifest";

export function reactWrapperPlugin(options: ReactWrapperOptions = {}) {
  return {
    name: "react-wrappers",
    packageLinkPhase({ customElementsManifest }: unknown) {
      generateReactWrappers(cloneManifest(customElementsManifest), options);
    },
  };
}

/** Plugin for @wc-toolkit/cem-generator that generates React wrappers from the finalized CEM. */
export function reactWrapperGeneratorPlugin(
  options: ReactWrapperOptions = {},
): Plugin {
  return {
    name: "@wc-toolkit/react-wrappers:cem-generator",
    afterGenerate(manifest: Package) {
      generateReactWrappers(cloneManifest(manifest), options);
    },
  };
}

function cloneManifest(manifest: unknown): Package {
  return structuredClone(manifest) as Package;
}
