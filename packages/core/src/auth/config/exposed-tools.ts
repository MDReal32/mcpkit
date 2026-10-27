import type { Env } from "../../env";
import { loadConfig } from "./load-config";
import { updateConfig } from "./update-config";

export const loadExposedTools = async (env: Env) => (await loadConfig(env)).expose ?? [];

export const saveExposedTools = async (env: Env, patterns: readonly string[]) => {
  await updateConfig(env, ({ expose: _previous, ...config }) =>
    patterns.length === 0 ? config : { ...config, expose: patterns },
  );
};
