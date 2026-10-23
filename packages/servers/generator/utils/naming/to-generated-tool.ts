import type { GeneratedTool } from "../types/generated-tool";
import type { OperationNames } from "../types/operation-names";
import type { ToolDefinition } from "../types/tool-definition";

export const toGeneratedTool = (names: OperationNames, definition: ToolDefinition): GeneratedTool => ({
  group: names.group,
  resourceFolder: names.resourceFolder,
  actionFile: names.actionFile,
  identifier: names.identifier,
  definition,
});
