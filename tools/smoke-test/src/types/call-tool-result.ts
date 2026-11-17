import type { TextContent } from "./text-content";

export interface CallToolResult {
  content: TextContent[];
  structuredContent?: { result?: unknown };
  isError?: boolean;
}
