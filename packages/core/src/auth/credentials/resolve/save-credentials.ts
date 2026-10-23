import type { SecretOwner } from '../../types/store/secret-owner';
import type { SecretStore } from '../../types/store/secret-store';

export const saveCredentials = async (
  owner: SecretOwner,
  values: Readonly<Record<string, string>>,
  secretStore: SecretStore | undefined,
) => {
  if (!secretStore) {
    return;
  }
  await Promise.all(Object.entries(values).map(([key, value]) => secretStore.set(owner, key, value)));
};
