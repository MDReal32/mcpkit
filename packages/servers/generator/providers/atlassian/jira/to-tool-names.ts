import { toKebabCase } from './to-kebab-case.ts';
import type { GeneratedTool } from './types/generated-tool.ts';
import type { ToolDefinition } from './types/tool-definition.ts';

const capitalize = (word: string) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;

const toCamelCase = (kebab: string) =>
  kebab
    .split('-')
    .map((word, index) => (index === 0 ? word : capitalize(word)))
    .join('');

const toSnakeCase = (kebab: string) => kebab.replaceAll('-', '_');

export const toToolNames = (group: string, category: string, operationId: string) => {
  const resourceFolder = toKebabCase(category);
  const actionFile = toKebabCase(operationId);
  return {
    group,
    resourceFolder,
    actionFile,
    name: [group, resourceFolder, actionFile].map(toSnakeCase).join(':'),
    identifier: toCamelCase(`${group}-${resourceFolder}-${actionFile}`),
  };
};

export const toGeneratedTool = (names: ReturnType<typeof toToolNames>, definition: ToolDefinition): GeneratedTool => ({
  group: names.group,
  resourceFolder: names.resourceFolder,
  actionFile: names.actionFile,
  identifier: names.identifier,
  definition,
});
