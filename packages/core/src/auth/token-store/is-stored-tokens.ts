import { isJsonObject } from '../../json';
import type { StoredTokens } from '../types/oauth/stored-tokens';
import { isStoredToken } from './is-stored-token';

export const isStoredTokens = (value: unknown): value is StoredTokens =>
  isJsonObject(value) && Object.values(value).every(isStoredToken);
