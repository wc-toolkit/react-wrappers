declare module "@awesome.me/webawesome/dist/custom-elements.json" {
  /**
   * The published WebAwesome Custom Elements Manifest is typed with widened strings,
   * which prevents TypeScript from inferring literal event names (e.g. "wa-clear").
   *
   * This module declaration narrows only the components used in the demo so
   * `wrapperSetup(manifest)` can infer custom event handler props like `onWaClear`.
   */
  const manifest: {
    schemaVersion?: string;
    modules?: readonly {
      declarations?: readonly (
        | {
            name: "WaInput";
            tagName: "wa-input";
            events?: readonly [{ name: "wa-clear" }, { name: "wa-invalid" }];
          }
        | {
            name: "WaButton";
            tagName: "wa-button";
            events?: readonly [];
          }
        | {
            name: string;
            tagName: string;
            events?: readonly { name: string }[];
          }
      )[];
    }[];
  };

  export default manifest;
}
