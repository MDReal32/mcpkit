import { toCamelCase } from './to-camel-case.ts';

export const resourceArrayName = (group: string, resourceFolder: string) =>
  `${toCamelCase(`${group}-${resourceFolder}`)}Tools`;

export const groupArrayName = (group: string) => `${toCamelCase(group)}GroupTools`;
