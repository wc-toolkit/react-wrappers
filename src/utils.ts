import fs from "fs";
import path from "path";
import prettier from "@prettier/sync";

export function has(arr?: unknown[]) {
  return Array.isArray(arr) && arr.length > 0;
}

export function createOutDir(outDir: string) {
  if (outDir !== "./" && !fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
}

export function saveFile(outDir: string, fileName: string, contents: string) {
  const outputPath = path.join(outDir, fileName);

  fs.writeFileSync(
    outputPath,
    prettier.format(contents, { parser: "typescript", printWidth: 80 }),
  );

  return outputPath;
}
