import type { ToolDefinition } from "./tool-definition";

export interface GeneratedTool {
  group: string;
  resourceFolder: string;
  actionFile: string;
  identifier: string;
  definition: ToolDefinition;
}
