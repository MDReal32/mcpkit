import type { OperationNames } from '../types/operation-names.ts';
import { toCamelCase } from './to-camel-case.ts';
import { toSnakeCase } from './to-snake-case.ts';

export const toToolNames = (group: string, resourceFolder: string, actionFile: string): OperationNames => ({
  group,
  resourceFolder,
  actionFile,
  name: [group, resourceFolder, actionFile].map(toSnakeCase).join(':'),
  identifier: toCamelCase(`${group}-${resourceFolder}-${actionFile}`),
});
