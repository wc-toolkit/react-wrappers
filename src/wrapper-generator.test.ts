import fs from "fs";
import os from "os";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import { generateReactWrappers } from "./wrapper-generator";

const tempDirs: string[] = [];

function createTempDir() {
  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "wc-toolkit-react-wrappers-"),
  );
  tempDirs.push(tempDir);
  return tempDir;
}

afterEach(() => {
  tempDirs.splice(0).forEach((dir) => {
    fs.rmSync(dir, { recursive: true, force: true });
  });
});

describe("generateReactWrappers", () => {
  it("maps className to the host class attribute", () => {
    const outdir = createTempDir();

    generateReactWrappers(
      {
        schemaVersion: "1.0.0",
        modules: [
          {
            kind: "javascript-module",
            path: "src/my-button.ts",
            declarations: [
              {
                kind: "class",
                name: "MyButton",
                tagName: "my-button",
                customElement: true,
                attributes: [{ name: "size", fieldName: "size" }],
              },
            ],
            exports: [
              {
                kind: "js",
                name: "MyButton",
                declaration: {
                  name: "MyButton",
                  module: "src/my-button.ts",
                },
              },
              {
                kind: "custom-element-definition",
                name: "my-button",
                declaration: {
                  name: "MyButton",
                  module: "src/my-button.ts",
                },
              },
            ],
          },
        ],
      },
      {
        outdir,
        modulePath: () => "./my-components/autoloader",
      },
    );

    const wrapper = fs.readFileSync(path.join(outdir, "MyButton.js"), "utf8");

    expect(wrapper).toMatch(
      /const \{[\s\S]*className,[\s\S]*\.\.\.restProps[\s\S]*\} = props;/,
    );
    expect(wrapper).toContain("class: className");
  });
});
