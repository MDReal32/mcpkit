import { readFile } from "node:fs/promises";
import type { WrapperPackageJson } from "./types/wrapper-package-json.ts";

export const readWrapperPackageJson = async (file: string) => {
  const packageJson: WrapperPackageJson = JSON.parse(await readFile(file, "utf8"));
  return packageJson;
};
