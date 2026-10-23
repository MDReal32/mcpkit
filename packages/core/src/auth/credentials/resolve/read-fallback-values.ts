import type { Env } from '../../../env';
import type { FallbackAuth } from '../../../manifest';
import { listAuthEnvNames } from '../../../manifest';
import type { AuthContext } from '../../types/auth-context';
import type { SecretOwner } from '../../types/store/secret-owner';

/** Each credential from its env var, else from the secret store. */
export const readFallbackValues = async (auth: FallbackAuth, owner: SecretOwner, context: AuthContext) => {
  const entries = await Promise.all(
    listAuthEnvNames(auth).map(async (name) => {
      const value = context.env[name] || (await context.secretStore?.get(owner, name));
      return [name, value] as const;
    }),
  );
  const values: Env = Object.fromEntries(entries);
  return values;
};
