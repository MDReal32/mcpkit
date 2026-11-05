import type { TextContent } from "./text-content.ts";

export interface CallToolResult {
  content: TextContent[];
  isError?: boolean;
}
