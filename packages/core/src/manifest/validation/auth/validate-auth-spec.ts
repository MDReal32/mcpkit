import { isJsonObject } from '../../../json';
import { AUTH_REQUIRED_KEYS, AUTH_TYPES } from '../../const';
import { isAuthType } from '../guards/is-auth-type';
import { validateAuthUi } from '../ui/validate-auth-ui';
import { validateOAuthFields } from './validate-oauth-fields';

export const validateAuthSpec = (auth: unknown, location: string, hasDomain: boolean) => {
  if (!isJsonObject(auth) || !isAuthType(auth.type)) {
    return [`${location}.type must be one of: ${AUTH_TYPES.join(', ')}`];
  }
  const authType = auth.type;
  const missing = AUTH_REQUIRED_KEYS[authType]
    .filter((key) => typeof auth[key] !== 'string')
    .map((key) => `${location}.${key} is required for auth type "${authType}"`);
  if (missing.length > 0) {
    return missing;
  }
  const labelErrors =
    auth.label === undefined || typeof auth.label === 'string' ? [] : [`${location}.label must be a string`];
  const uiErrors = [...labelErrors, ...validateAuthUi(auth, location, hasDomain)];
  return authType === 'oauth' ? [...validateOAuthFields(auth, location), ...uiErrors] : uiErrors;
};
