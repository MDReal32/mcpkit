import { isHttpsUrl } from '../guards/is-https-url';
import { validateSignInFields } from './validate-sign-in-fields';

export const validateOAuthFields = (auth: Readonly<Record<string, unknown>>, location: string) => {
  const errors: string[] = [];
  if (!isHttpsUrl(auth.authorizationUrl)) {
    errors.push(`${location}.authorizationUrl must be an https:// URL`);
  }
  if (!isHttpsUrl(auth.tokenUrl)) {
    errors.push(`${location}.tokenUrl must be an https:// URL`);
  }
  if (auth.clientSecretEnv !== undefined && typeof auth.clientSecretEnv !== 'string') {
    errors.push(`${location}.clientSecretEnv must be a string`);
  }
  return [...errors, ...validateSignInFields(auth, location)];
};
