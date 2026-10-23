import type { Manifest } from '../../../manifest';
import { saveServerDomain } from '../../config/save-server-domain';
import type { AuthContext } from '../../types/auth-context';
import { saveCredentials } from './save-credentials';

/** Secrets go to the secret store; the domain is not secret and goes to the config file. */
export const saveFormAnswer = async (
  manifest: Manifest,
  values: Readonly<Record<string, string>>,
  domain: string | undefined,
  context: AuthContext,
) => {
  await saveCredentials(manifest, values, context.secretStore);
  if (domain !== undefined) {
    await saveServerDomain(context.env, manifest.name, domain);
  }
};
