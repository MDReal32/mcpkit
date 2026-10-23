import type { OperationNames } from '../types/operation-names';
import { toCamelCase } from './to-camel-case';
import { toSnakeCase } from './to-snake-case';

export const toToolNames = (group: string, resourceFolder: string, actionFile: string): OperationNames => ({
  group,
  resourceFolder,
  actionFile,
  name: [group, resourceFolder, actionFile].map(toSnakeCase).join(':'),
  identifier: toCamelCase(`${group}-${resourceFolder}-${actionFile}`),
});
