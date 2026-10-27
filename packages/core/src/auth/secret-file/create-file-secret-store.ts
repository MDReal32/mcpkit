import type { Env } from "../../env";
import { loadConfig } from "../config/load-config";
import { updateServerConfig } from "../config/update-server-config";
import type { SecretStore } from "../types/store/secret-store";

/** Plain text in the 0600 config file under the mcpkit home, read on every call so all running servers see each other's saves. */
export const createFileSecretStore = (env: Env = process.env) => {
  const store: SecretStore = {
    get: async (owner, key) => (await loadConfig(env)).servers?.[owner.name]?.secrets?.[key],
    set: async (owner, key, value) => {
      await updateServerConfig(env, owner.name, (current) => ({
        ...current,
        secrets: { ...current.secrets, [key]: value },
      }));
    },
  };
  return store;
};
