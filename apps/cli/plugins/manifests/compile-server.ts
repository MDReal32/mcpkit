import { existsSync } from 'node:fs';
import { relative } from 'node:path';
import { describeError } from '@usemcpkit/core';
import { checkManifestJson } from './check-manifest-json';
import { loadServerDefinition } from './load-server-definition';
import { toManifestJson } from './to-manifest-json';
import type { ServerEntry } from './types/server-entry';
import type { ServerOutcome } from './types/server-outcome';

export const compileServer = async ({ dir, file }: ServerEntry) => {
  if (!existsSync(file)) {
    const missing: ServerOutcome = { dir, errors: [`missing entry file ${dir}/${dir}.ts`], dependencies: [] };
    return missing;
  }
  try {
    const { definition, dependencies } = await loadServerDefinition(file);
    const json = toManifestJson(definition);
    const { manifest, errors } = checkManifestJson(json, dir);
    const outcome: ServerOutcome = {
      dir,
      compiled: manifest && { file, manifest, json },
      errors,
      dependencies: [file, ...dependencies],
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
