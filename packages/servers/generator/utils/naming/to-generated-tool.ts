import type { GeneratedTool } from '../types/generated-tool.ts';
import type { OperationNames } from '../types/operation-names.ts';
import type { ToolDefinition } from '../types/tool-definition.ts';

export const toGeneratedTool = (names: OperationNames, definition: ToolDefinition): GeneratedTool => ({
  group: names.group,
  resourceFolder: names.resourceFolder,
  actionFile: names.actionFile,
  identifier: names.identifier,
  definition,
});
