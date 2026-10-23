import type { Env } from '../../env';
import { writeJsonFile } from '../secrets/write-json-file';
import type { SecretStore } from '../types/store/secret-store';
import type { StoredSecrets } from '../types/store/stored-secrets';
import { createExclusiveRunner } from './create-exclusive-runner';
import { readStoredSecrets } from './read-stored-secrets';
import { resolveSecretsFile } from './resolve-secrets-file';

/** Plain text in a 0600 file under the mcpkit home, read on every call so all running servers see each other's saves. */
export const createFileSecretStore = (env: Env = process.env) => {
  const file = resolveSecretsFile(env);
  const runExclusive = createExclusiveRunner();
  const store: SecretStore = {
    get: async (owner, key) => (await readStoredSecrets(file))[owner.name]?.[key],
    set: (owner, key, value) =>
      runExclusive(async () => {
        const secrets = await readStoredSecrets(file);
        const updated: StoredSecrets = {
          ...secrets,
          [owner.name]: { ...secrets[owner.name], [key]: value },
        };
        await writeJsonFile(file, updated);
      }),
  };
  return store;
};
