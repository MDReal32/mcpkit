import { isJsonObject } from '../../json';
import type { StoredSecrets } from '../types/store/stored-secrets';

const isServerSecrets = (value: unknown) =>
  isJsonObject(value) && Object.values(value).every((entry) => typeof entry === 'string');

export const isStoredSecrets = (value: unknown): value is StoredSecrets =>
  isJsonObject(value) && Object.values(value).every(isServerSecrets);
