import type { GeneratedTool } from './types/generated-tool.ts';
import type { ToolDefinition } from './types/tool-definition.ts';

const capitalize = (word: string) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;

const toCamelCase = (kebab: string) =>
  kebab
    .split('-')
    .map((word, index) => (index === 0 ? word : capitalize(word)))
    .join('');

const toSnakeCase = (kebab: string) => kebab.replaceAll('-', '_');

export const toToolNames = (operationId: string) => {
  const separator = operationId.indexOf('/');
  const resourceFolder = operationId.slice(0, separator);
  const actionFile = operationId.slice(separator + 1);
  return {
    resourceFolder,
    actionFile,
    name: `${toSnakeCase(resourceFolder)}:${toSnakeCase(actionFile)}`,
    identifier: toCamelCase(`${resourceFolder}-${actionFile}`),
  };
};

export const toGeneratedTool = (
  folder: string,
  names: ReturnType<typeof toToolNames>,
  definition: ToolDefinition,
): GeneratedTool => ({
  folder,
  resourceFolder: names.resourceFolder,
  actionFile: names.actionFile,
  identifier: names.identifier,
  definition,
});
