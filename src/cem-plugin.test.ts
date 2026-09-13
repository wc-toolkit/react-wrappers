import { describe, expect, it } from "vitest";
import { reactWrapperGeneratorPlugin } from "./cem-analyzer-plugin";

describe("reactWrapperGeneratorPlugin", () => {
  it("implements the cem-generator completion hook", () => {
    const plugin = reactWrapperGeneratorPlugin();

    expect(plugin.name).toBe("@wc-toolkit/react-wrappers:cem-generator");
    expect(plugin.afterGenerate).toEqual(expect.any(Function));
  });
});
