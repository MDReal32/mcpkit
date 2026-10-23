import { isJsonObject } from '../../json';
import type { StoredToken } from '../types/oauth/stored-token';
import { isOptionalOfType } from './is-optional-of-type';

export const isStoredToken = (value: unknown): value is StoredToken =>
  isJsonObject(value) &&
  typeof value.accessToken === 'string' &&
  typeof value.tokenType === 'string' &&
  isOptionalOfType(value.refreshToken, 'string') &&
  isOptionalOfType(value.expiresAt, 'number') &&
  isOptionalOfType(value.scope, 'string') &&
  isOptionalOfType(value.authKey, 'string');
