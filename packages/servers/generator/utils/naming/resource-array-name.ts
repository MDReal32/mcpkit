import { toCamelCase } from './to-camel-case';

export const resourceArrayName = (group: string, resourceFolder: string) =>
  `${toCamelCase(`${group}-${resourceFolder}`)}Tools`;
