import { isJsonObject } from './is-json-object';

export const isStringRecord = (value: unknown): value is Record<string, string> =>
  isJsonObject(value) && Object.values(value).every((entry) => typeof entry === 'string');
