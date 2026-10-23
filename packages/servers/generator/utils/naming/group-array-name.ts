import { toCamelCase } from './to-camel-case';

export const groupArrayName = (group: string, suffix: string) => `${toCamelCase(group)}${suffix}`;
