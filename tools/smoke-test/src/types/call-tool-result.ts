import type { TextContent } from "./text-content";

export interface CallToolResult {
  content: TextContent[];
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
}
