import { toCamelCase } from './to-camel-case.ts';
import type { GeneratedTool } from './types/generated-tool.ts';
import type { OperationNames } from './types/operation-names.ts';
import type { ToolDefinition } from './types/tool-definition.ts';

const toSnakeCase = (kebab: string) => kebab.replaceAll('-', '_');

export const toToolNames = (group: string, resourceFolder: string, actionFile: string): OperationNames => ({
  group,
  resourceFolder,
  actionFile,
  name: [group, resourceFolder, actionFile].map(toSnakeCase).join(':'),
  identifier: toCamelCase(`${group}-${resourceFolder}-${actionFile}`),
});

export const toGeneratedTool = (names: OperationNames, definition: ToolDefinition): GeneratedTool => ({
  group: names.group,
  resourceFolder: names.resourceFolder,
  actionFile: names.actionFile,
  identifier: names.identifier,
  definition,
});
