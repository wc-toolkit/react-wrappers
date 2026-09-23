import fs from "fs";
import os from "os";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";
import { generateReactWrappers } from "./wrapper-generator";
import { getModulePath } from "./react-utils";

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
    const componentPath = path.join(outdir, "..", "dist", "components", "my-button.js");

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
    const componentPath = path.join(outdir, "..", "dist", "components", "my-button.js");

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
                members: [{ kind: "field", name: "case", type: { text: "string" } }],
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
                name: "my-badge",
                tagName: "my-badge",
                customElement: true,
                superclass: { name: "HTMLUnknownElement" },
                attributes: [
                  {
                    name: "tone",
                    type: { text: '"neutral" | "loud"' },
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

    const wrapper = fs.readFileSync(path.join(outdir, "MyBadge.js"), "utf8");
    const types = fs.readFileSync(path.join(outdir, "MyBadge.d.ts"), "utf8");

    expect(wrapper).toContain('import "./my-badge.css";');
    expect(wrapper).toContain('export const MyBadge = forwardRef');
    expect(wrapper).toContain('"my-badge"');
    expect(types).toContain("export type MyBadgeElement = HTMLUnknownElement;");
    expect(types).toContain('tone?: "neutral" | "loud";');
    expect(types).toContain('"--badge-color"?: string | number;');
    expect(types).toContain("Optional icon.");
    expect(types).not.toContain("import { my-badge");
    expect(types).not.toContain("from './my-badge.css'");
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
    expect(fs.readFileSync(path.join(outdir, "BadgeWrapper.js"), "utf8")).toContain(
      "export const BadgeWrapper",
    );
  });
});
