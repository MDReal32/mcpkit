import { existsSync } from "node:fs";
import { basename, dirname, relative } from "node:path";
import { describeError } from "@usemcpkit/core";
import { checkManifestJson } from "./check-manifest-json";
import { loadServerDefinition } from "./load-server-definition";
import { publishLocalSpecs } from "./publish-local-specs";
import { toRegistryJson } from "./to-registry-json";
import type { ServerEntry } from "./types/server-entry";
import type { ServerOutcome } from "./types/server-outcome";

export const compileServer = async ({ dir, file }: ServerEntry) => {
  if (!existsSync(file)) {
    const missing: ServerOutcome = { dir, errors: [`missing entry file ${dir}/${basename(dir)}.ts`], dependencies: [] };
    return missing;
  }
  try {
    const { definition, dependencies } = await loadServerDefinition(file);
    const checked = checkManifestJson(toRegistryJson(definition), dir);
    if (!checked.manifest) {
      const invalid: ServerOutcome = { dir, errors: checked.errors, dependencies: [file, ...dependencies] };
      return invalid;
    }
    const { manifest, files, sources } = await publishLocalSpecs(checked.manifest, dirname(file));
    const outcome: ServerOutcome = {
      dir,
      compiled: { file, manifest, json: toRegistryJson(manifest), specs: files },
      errors: [],
      dependencies: [file, ...dependencies, ...sources],
    };
    return outcome;
  } catch (error) {
    const failed: ServerOutcome = {
      dir,
      errors: [`failed to load ${relative(process.cwd(), file)}: ${describeError(error)}`],
      dependencies: [file],
    };
    return failed;
  }
};
