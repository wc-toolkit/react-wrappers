/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import fs from "fs";
import { saveFile } from "./utils";
import { toPascalCase } from "@wc-toolkit/cem-utilities";
import { Component } from "@wc-toolkit/cem-utilities";

// 
export function getPackageJson() {
  const packageJsonPath = path.join(process.cwd(), "package.json");
  return JSON.parse(fs.readFileSync(packageJsonPath).toString());
}

export function getModulePath(
  modulePath: ((className: string, tagName: string) => string) | undefined,
  component: Component,
  outdir: string,
  packageJson: any,
) {
  if (modulePath instanceof Function) {
    return modulePath(component.name, component.tagName!);
  }

  if (!packageJson.module) {
    throw new Error(
      "You must define a module path in order to generate React wrappers.",
    );
  }

  const directories = outdir?.split("/");
  return path.join(directories.map(() => "../").join(""), packageJson.module);
}

export const createEventName = (event: any) => `on${toPascalCase(event.name)}`;

export const RESERVED_WORDS = [
  "children",
  "localName",
  "ref",
  "style",
  "className",
  "abstract",
  "arguments",
  "await",
  "boolean",
  "break",
  "byte",
  "case",
  "catch",
  "char",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "double",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "final",
  "finally",
  "float",
  "function",
  "goto",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "int",
  "interface",
  "let",
  "long",
  "native",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "short",
  "static",
  "super",
  "switch",
  "synchronized",
  "this",
  "throw",
  "throws",
  "transient",
  "true",
  "try",
  "typeof",
  "var",
  "void",
  "volatile",
  "while",
  "with",
  "yield",
];

export function saveReactUtils(outdir: string, ssrSafe?: boolean) {
  const reactUtils = `
import { useEffect, useLayoutEffect, useRef } from "react";

${ssrSafe ? `const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect` : ""}

export function mergeRefs(target, forwardedRef) {
  if (!forwardedRef) {
    return;
  }

  if (typeof forwardedRef === "function") {
    forwardedRef(target);
  } else {
    forwardedRef.current = target;
  }
}

export function createForwardedRefHandler(localRef, forwardedRef) {
  return (node) => {
    localRef.current = node;
    mergeRefs(node, forwardedRef);
  };
}

export function useProperties(targetElement, propName, value) {
  useEffect(() => {
    const el = targetElement?.current;
    if (!el || value === undefined || el[propName] === value) {
      return;
    }

    try {
      el[propName] = value;
    } catch (e) {
      console.warn(e);
    }
  }, [targetElement, propName, value]);
}

export function useEventListener(targetElement, eventName, eventHandler) {
  // keep a ref to the latest handler so we don't need to re-register the event listener
  // whenever the handler changes (avoids duplicate listeners on re-renders)
  const handlerRef = useRef(eventHandler);
  handlerRef.current = eventHandler;

  ${ssrSafe ? "useIsomorphicLayoutEffect" : "useLayoutEffect"}(() => {
    const el = targetElement?.current;
    if (!el || eventName === undefined) {
      return;
    }

    // capture the handler at the time the listener is attached so we can call cancel on it
    const eventListener = (event) => {
      const handler = handlerRef.current;
      if (handler) {
        handler(event);
      }
    };

    el.addEventListener(eventName, eventListener);

    return () => {
      const handler = handlerRef.current;
      if (handler?.cancel) {
        handler.cancel();
      }
      el.removeEventListener(eventName, eventListener);
    };
  }, [eventName, targetElement?.current]);
}

`;

  saveFile(outdir, "react-utils.js", reactUtils);
}

export function saveScopeProvider(outdir: string, ssrSafe?: boolean) {
  const scopeProvider = `
${ssrSafe ? '"use client"' : ""}
import { createContext } from 'react';
import { jsx } from "react/jsx-runtime";

export const ScopeContext = createContext(null);

export function ScopeProvider({ tagFormatter, children }) {
  return jsx(ScopeContext.Provider, {
    value: { tagFormatter },
    children,
  });
}
`;

  const scopeProviderTypes = `
export type ScopeProps = {
  /** Optional function to format the custom element tag names. */
  tagFormatter?: (tagName: string, componentName: string) => string;
  children?: React.ReactNode
};

/**
 * Provides a mechanism to add a custom prefix or suffix to to child components.
 * This prevents tag name collisions with components from different versions of the same library.
 */
export function ScopeProvider(props: ScopeProps): JSX.Element;
`;

  saveFile(outdir, "ScopeProvider.js", scopeProvider);
  saveFile(outdir, "ScopeProvider.d.ts", scopeProviderTypes);
}
