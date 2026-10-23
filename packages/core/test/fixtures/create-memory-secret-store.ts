import type { SecretStore } from "../../src/main";

export const createMemorySecretStore = (initial: Readonly<Record<string, string>> = {}) => {
  const saved = new Map(Object.entries(initial));
  const secretStore: SecretStore = {
    get: async (owner, key) => saved.get(`${owner.category}:${owner.name}:${key}`),
    set: async (owner, key, value) => {
      saved.set(`${owner.category}:${owner.name}:${key}`, value);
    },
  };
  return { secretStore, saved };
};
