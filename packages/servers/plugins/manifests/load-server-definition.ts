import { runnerImport } from "vite";
import { readSingleExport } from "./read-single-export";
import type { LoadedServer } from "./types/loaded-server";

export const loadServerDefinition = async (file: string) => {
  const { module, dependencies } = await runnerImport<Record<string, unknown>>(file, {
    configFile: false,
    logLevel: "silent",
  });
  const loaded: LoadedServer = { definition: readSingleExport(module), dependencies };
  return loaded;
};
