import type { Env } from "../../env";
import { loadConfig } from "../config/load-config";
import { readServerConfig } from "../config/read-server-config";
import { updateServerConfig } from "../config/update-server-config";
import { DEFAULT_HOST_KEY } from "../const";
import type { SecretOwner } from "../types/store/secret-owner";
import type { SecretStore } from "../types/store/secret-store";

const toHostKey = (owner: SecretOwner) => owner.domain ?? DEFAULT_HOST_KEY;

/** Plain text in the 0600 config file under the mcpkit home, by server and host, read on every call so all running servers see each other's saves. */
export const createFileSecretStore = (env: Env = process.env) => {
  const store: SecretStore = {
    get: async (owner, key) =>
      readServerConfig(await loadConfig(env), owner)?.hosts?.[toHostKey(owner)]?.secrets?.[key],
    set: async (owner, key, value) => {
      const host = toHostKey(owner);
      await updateServerConfig(env, owner, (current) => ({
        ...current,
        hosts: {
          ...current.hosts,
          [host]: { ...current.hosts?.[host], secrets: { ...current.hosts?.[host]?.secrets, [key]: value } },
        },
      }));
    },
  };
  return store;
};
