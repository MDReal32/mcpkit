import { isStringRecord } from '../../../json';
import { SERVER_CATEGORY_PATTERN, SERVER_NAME_PATTERN } from '../../const';
import { isBaseUrl } from '../guards/is-base-url';

export const validateServerFields = (manifest: Readonly<Record<string, unknown>>) => {
  const errors: string[] = [];
  if (!SERVER_NAME_PATTERN.test(String(manifest.name ?? ''))) {
    errors.push(`name must match ${SERVER_NAME_PATTERN}`);
  }
  if (!SERVER_CATEGORY_PATTERN.test(String(manifest.category ?? ''))) {
    errors.push(`category must match ${SERVER_CATEGORY_PATTERN}`);
  }
  if (typeof manifest.version !== 'string') {
    errors.push('version is required');
  }
  if (!isBaseUrl(manifest.baseUrl)) {
    errors.push('baseUrl must be an https:// URL');
  }
  if (manifest.headers !== undefined && !isStringRecord(manifest.headers)) {
    errors.push('headers must be an object of strings');
  }
  return errors;
};
