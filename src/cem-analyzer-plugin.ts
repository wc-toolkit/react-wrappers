import { generateReactWrappers } from "./wrapper-generator";
import type { ReactWrapperOptions } from "./types";

export function reactWrapperPlugin(options: ReactWrapperOptions = {}) {
  return {
    name: "react-wrappers",
    packageLinkPhase({ customElementsManifest }: unknown) {
      generateReactWrappers(customElementsManifest, options);
    },
  };
}
