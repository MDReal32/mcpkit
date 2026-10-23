import { isJsonObject } from '../json';

export const readProperty = (source: unknown, key: string) => (isJsonObject(source) ? source[key] : undefined);
