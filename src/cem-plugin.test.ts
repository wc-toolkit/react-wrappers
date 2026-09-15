import { describe, expect, it } from "vitest";
import { reactWrapperGeneratorPlugin } from "./cem-analyzer-plugin";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

describe("reactWrapperGeneratorPlugin", () => {
  it("implements the cem-generator completion hook", () => {
    const plugin = reactWrapperGeneratorPlugin();

    expect(plugin.name).toBe("@wc-toolkit/react-wrappers:cem-generator");
    expect(plugin.afterGenerate).toEqual(expect.any(Function));
  });

  it("does not add React wrapper metadata to the source manifest", () => {
    const outdir = mkdtempSync(join(tmpdir(), "react-wrappers-test-"));
    const manifest = {
      schemaVersion: "2.1.0",
      modules: [
        {
          kind: "javascript-module",
          path: "src/button.ts",
          declarations: [
            {
              kind: "class",
              name: "Button",
              tagName: "x-button",
              attributes: [{ name: "disabled", type: { text: "boolean" } }],
              members: [],
              exports: [],
            },
          ],
          exports: [],
        },
      ],
    };

    try {
      reactWrapperGeneratorPlugin({ outdir }).afterGenerate(manifest);
      expect(manifest.modules[0].declarations[0].attributes[0]).toEqual({
        name: "disabled",
        type: { text: "boolean" },
      });
    } finally {
      rmSync(outdir, { recursive: true, force: true });
    }
  });
});
