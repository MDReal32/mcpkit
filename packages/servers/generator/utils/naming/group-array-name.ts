import { toCamelCase } from './to-camel-case.ts';

export const groupArrayName = (group: string, suffix: string) => `${toCamelCase(group)}${suffix}`;
