import { toCamelCase } from './to-camel-case.ts';

export const resourceArrayName = (resourceFolder: string) => `${toCamelCase(resourceFolder)}Tools`;
