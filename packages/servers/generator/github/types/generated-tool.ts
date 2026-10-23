import type { ToolDefinition } from './tool-definition';

export interface GeneratedTool {
  folder: string;
  resourceFolder: string;
  actionFile: string;
  identifier: string;
  definition: ToolDefinition;
}
