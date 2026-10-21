import fs from "fs";
import os from "os";
import path from "path";
import { execFileSync } from "child_process";
import { createRequire } from "module";
import { afterEach, describe, expect, it } from "vitest";
import { generateReactWrappers } from "./wrapper-generator";
import { getModulePath } from "./react-utils";

const tempDirs: string[] = [];
const require = createRequire(import.meta.url);

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

function generateButtonTypes(
  events: Array<{ name: string; type?: { text: string } }>,
  options: Partial<Parameters<typeof generateReactWrappers>[1]> = {},
): string {
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
              events,
            },
          ],
          exports: [
            {
              kind: "js",
              name: "MyButton",
              declaration: { name: "MyButton", module: "src/my-button.ts" },
            },
            {
              kind: "custom-element-definition",
              name: "my-button",
              declaration: { name: "MyButton", module: "src/my-button.ts" },
            },
          ],
        },
      ],
    },
    { outdir, modulePath: () => "./my-components/autoloader", ...options },
  );
  return fs.readFileSync(path.join(outdir, "MyButton.d.ts"), "utf8");
}

describe("generateReactWrappers", () => {
  it("uses the CEM module path when package.json has no module field", () => {
    const outdir = createTempDir();
    const componentPath = path.join(
      outdir,
      "..",
      "dist",
      "components",
      "my-button.js",
    );

    expect(
      getModulePath(
        undefined,
        {
          name: "MyButton",
          tagName: "my-button",
          modulePath: componentPath,
          customElement: true,
        },
        outdir,
        {},
      ),
    ).toBe("../dist/components/my-button.js");
  });

  it("passes the CEM module path to a custom module path resolver", () => {
    const outdir = createTempDir();
    const componentPath = path.join(
      outdir,
      "..",
      "dist",
      "components",
      "my-button.js",
    );

    expect(
      getModulePath(
        (_className, _tagName, cemModulePath) => cemModulePath!,
        {
          name: "MyButton",
          tagName: "my-button",
          modulePath: componentPath,
          customElement: true,
        },
        outdir,
        {},
      ),
    ).toBe(componentPath);
  });

  it("leaves bare package module specifiers unchanged", () => {
    const outdir = createTempDir();

    expect(
      getModulePath(
        undefined,
        {
          name: "MyButton",
          tagName: "my-button",
          modulePath: "@scope/components/button",
          customElement: true,
        },
        outdir,
        {},
      ),
    ).toBe("@scope/components/button");
  });

  it("resolves scoped file module paths relative to the output directory", () => {
    const outdir = createTempDir();
    const modulePath = getModulePath(
      undefined,
      {
        name: "MyButton",
        tagName: "my-button",
        modulePath: "@scope/components/button.js",
        customElement: true,
      },
      outdir,
      {},
    );

    expect(modulePath).not.toBe("@scope/components/button.js");
    expect(modulePath).toMatch(/@scope\/components\/button\.js$/);
    expect(modulePath.startsWith(".")).toBe(true);
  });

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

  it("maps reserved attributes to valid generated property identifiers", () => {
    const outdir = createTempDir();

    generateReactWrappers(
      {
        schemaVersion: "1.0.0",
        modules: [
          {
            kind: "javascript-module",
            path: "dist/otp-input.js",
            declarations: [
              {
                kind: "class",
                name: "OtpInput",
                tagName: "wa-otp-input",
                customElement: true,
                attributes: [{ name: "case", fieldName: "case" }],
                members: [
                  { kind: "field", name: "case", type: { text: "string" } },
                ],
              },
            ],
            exports: [
              {
                kind: "js",
                name: "OtpInput",
                declaration: { name: "OtpInput", module: "dist/otp-input.js" },
              },
            ],
          },
        ],
      },
      { outdir, attributeMapping: { case: "caseValue" } },
    );

    const wrapper = fs.readFileSync(path.join(outdir, "OtpInput.js"), "utf8");
    expect(wrapper).toContain("case: caseValue");
    expect(wrapper).not.toContain("case: case ??");
  });

  it("types and imports a CustomEvent detail for strongly typed events", () => {
    const types = generateButtonTypes(
      [{ name: "my-change", type: { text: "CustomEvent<MyDetail>" } }],
      { stronglyTypedEvents: true },
    );

    // The detail type the event aliases reference is imported alongside the element.
    expect(types).toMatch(
      /import \{[^}]*MyButton as MyButtonElement[^}]*MyDetail[^}]*\} from/,
    );
    // The alias is declared once and the handler references exactly that name —
    // not the base event type concatenated with it.
    expect(types).toMatch(
      /export type MyButtonMyChangeElementEvent =\s*MyButtonElementEvent<\s*CustomEvent<MyDetail>\s*>;/,
    );
    expect(types).toContain(
      "onMyChange?: (event: MyButtonMyChangeElementEvent) => void;",
    );
    expect(types).not.toContain(
      "MyButtonElementEventMyButtonMyChangeElementEvent",
    );
  });

  it("does not import a union detail type", () => {
    const types = generateButtonTypes(
      [{ name: "my-change", type: { text: "CustomEvent<Foo | Bar>" } }],
      { stronglyTypedEvents: true },
    );

    // A union has no single importable name; nothing with a `|` may be spliced
    // into the import.
    expect(types).not.toMatch(/import \{[^}]*\|[^}]*\} from/);
  });

  it("does not import a generic CustomEvent detail type", () => {
    const types = generateButtonTypes([
      {
        name: "my-change",
        type: { text: "CustomEvent<Record<string, never>>" },
      },
    ]);

    expect(types).not.toMatch(/import \{[^}]*Record[^}]*\} from/);
    expect(types).toContain("CustomEvent<Record<string, never>>");
  });

  it("uses the raw event type for handlers without strong typing", () => {
    const types = generateButtonTypes(
      [{ name: "my-change", type: { text: "CustomEvent<MyDetail>" } }],
      { stronglyTypedEvents: false },
    );

    // Without strong typing there is no per-event alias, so the handler takes the
    // raw event type — and the detail is still imported so it resolves.
    expect(types).toContain(
      "onMyChange?: (event: CustomEvent<MyDetail>) => void;",
    );
    expect(types).toMatch(/import \{[^}]*MyDetail[^}]*\} from/);
  });

  it("generates wrappers for CSS-only CEM declarations without importing a class", () => {
    const outdir = createTempDir();

    generateReactWrappers(
      {
        schemaVersion: "1.0.0",
        modules: [
          {
            kind: "javascript-module",
            path: "src/my-badge.css",
            declarations: [
              {
                kind: "class",
                name: "Layout",
                tagName: "zd-flex",
                customElement: true,
                attributes: [
                  {
                    name: "tone",
                    type: { text: "row | column" },
                    description: "The badge tone.",
                  },
                ],
                cssProperties: [
                  { name: "--badge-color", description: "Badge color." },
                ],
                slots: [{ name: "icon", description: "Optional icon." }],
              },
            ],
            exports: [],
          },
        ],
      },
      { outdir, modulePath: () => "./my-badge.css" },
    );

    const wrapper = fs.readFileSync(path.join(outdir, "ZdFlex.js"), "utf8");
    const types = fs.readFileSync(path.join(outdir, "ZdFlex.d.ts"), "utf8");

    expect(wrapper).not.toContain("my-badge.css");
    expect(wrapper).toContain("export const ZdFlex = forwardRef");
    expect(wrapper).toContain('"zd-flex"');
    expect(types).toContain("export type ZdFlexElement = HTMLElement;");
    expect(types).toContain('tone?: "row" | "column";');
    expect(types).toContain('"--badge-color"?: string | number;');
    expect(types).toContain("Optional icon.");
    expect(types).not.toContain("import { my-badge");
    expect(types).not.toContain("from './my-badge.css'");
  });

  it("type-checks generated wrappers for normal and CSS-only components", () => {
    const projectDir = createTempDir();
    const outdir = path.join(projectDir, "types");
    const srcDir = path.join(projectDir, "src");
    fs.mkdirSync(srcDir, { recursive: true });
    fs.symlinkSync(
      path.resolve(process.cwd(), "node_modules"),
      path.join(projectDir, "node_modules"),
      "dir",
    );
    fs.writeFileSync(
      path.join(srcDir, "button.ts"),
      `export type ErrorDetail = { message: string };\nexport class Button extends HTMLElement {}\n`,
    );
    const buttonPath = path.join(srcDir, "button.ts");
    const cssPath = path.join(srcDir, "zd-flex.css");

    generateReactWrappers(
      {
        schemaVersion: "1.0.0",
        modules: [
          {
            kind: "javascript-module",
            path: buttonPath,
            declarations: [
              {
                kind: "class",
                name: "Button",
                tagName: "x-button",
                customElement: true,
                events: [
                  { name: "error", type: { text: "CustomEvent<ErrorDetail>" } },
                ],
              },
            ],
            exports: [
              {
                kind: "js",
                name: "Button",
                declaration: { name: "Button", module: buttonPath },
              },
            ],
          },
          {
            kind: "javascript-module",
            path: cssPath,
            declarations: [
              {
                kind: "class",
                name: "Layout",
                tagName: "zd-flex",
                customElement: true,
                attributes: [
                  { name: "direction", type: { text: "row | column" } },
                ],
              },
            ],
            exports: [],
          },
        ],
      },
      { outdir },
    );
    fs.writeFileSync(
      path.join(projectDir, "consumer.ts"),
      `import type { ButtonProps } from "./types/Button";\nimport type { ZdFlexProps } from "./types/ZdFlex";\nconst button: ButtonProps = { onError: (event) => event.detail.message };\nconst layout: ZdFlexProps = { direction: "column" };\n`,
    );
    fs.writeFileSync(
      path.join(projectDir, "tsconfig.json"),
      JSON.stringify({
        compilerOptions: {
          target: "ESNext",
          module: "ESNext",
          moduleResolution: "bundler",
          strict: true,
          skipLibCheck: true,
          allowSyntheticDefaultImports: true,
          noEmit: true,
        },
        include: ["consumer.ts", "types/**/*.d.ts", "src/**/*.ts"],
      }),
    );

    const tscPath = path.resolve(
      path.dirname(require.resolve("typescript")),
      "../bin/tsc",
    );
    expect(() =>
      execFileSync(
        process.execPath,
        [tscPath, "--noEmit", "--project", "tsconfig.json"],
        {
          cwd: projectDir,
          stdio: "pipe",
        },
      ),
    ).not.toThrow();
  });

  it("does not mutate a manifest reused for sequential wrapper generation", () => {
    const firstOutdir = createTempDir();
    const secondOutdir = createTempDir();
    const manifest = {
      schemaVersion: "1.0.0",
      modules: [
        {
          kind: "javascript-module",
          path: "src/button.ts",
          declarations: [
            {
              kind: "class",
              name: "Button",
              tagName: "x-button",
              customElement: true,
              attributes: [
                { name: "label", fieldName: "label", type: { text: "string" } },
              ],
              members: [
                { kind: "field", name: "label", type: { text: "string" } },
              ],
            },
          ],
          exports: [
            {
              kind: "js",
              name: "Button",
              declaration: { name: "Button", module: "src/button.ts" },
            },
          ],
        },
      ],
    };
    const before = structuredClone(manifest);
    const options = { modulePath: () => "./components/autoloader" };

    generateReactWrappers(manifest, { outdir: firstOutdir, ...options });
    const first = fs.readFileSync(
      path.join(firstOutdir, "Button.d.ts"),
      "utf8",
    );
    generateReactWrappers(manifest, { outdir: secondOutdir, ...options });
    const second = fs.readFileSync(
      path.join(secondOutdir, "Button.d.ts"),
      "utf8",
    );

    expect(manifest).toEqual(before);
    expect(second).toBe(first);
  });

  it("applies the component name formatter to CSS-only declarations", () => {
    const outdir = createTempDir();

    generateReactWrappers(
      {
        schemaVersion: "1.0.0",
        modules: [
          {
            kind: "javascript-module",
            path: "src/my-badge.css",
            declarations: [
              {
                kind: "class",
                name: "my-badge",
                tagName: "my-badge",
                customElement: true,
                superclass: { name: "HTMLUnknownElement" },
              },
            ],
            exports: [],
          },
        ],
      },
      {
        outdir,
        modulePath: () => "./my-badge.css",
        componentNameFormatter: () => "BadgeWrapper",
      },
    );

    expect(fs.existsSync(path.join(outdir, "BadgeWrapper.js"))).toBe(true);
    expect(
      fs.readFileSync(path.join(outdir, "BadgeWrapper.js"), "utf8"),
    ).toContain("export const BadgeWrapper");
  });

  it("respects exclude for CSS-only declarations", () => {
    const outdir = createTempDir();
    generateReactWrappers(
      {
        schemaVersion: "1.0.0",
        modules: [
          {
            kind: "javascript-module",
            path: "src/zd-flex.css",
            declarations: [
              {
                kind: "class",
                name: "Layout",
                tagName: "zd-flex",
                customElement: true,
              },
            ],
            exports: [],
          },
        ],
      },
      { outdir, exclude: ["Layout"] },
    );

    expect(fs.existsSync(path.join(outdir, "ZdFlex.js"))).toBe(false);
    expect(fs.existsSync(path.join(outdir, "ZdFlex.d.ts"))).toBe(false);
  });
});
