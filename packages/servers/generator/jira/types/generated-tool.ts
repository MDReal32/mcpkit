import type { ToolDefinition } from './tool-definition.ts';

export interface GeneratedTool {
  group: string;
  resourceFolder: string;
  actionFile: string;
  identifier: string;
  definition: ToolDefinition;
}
