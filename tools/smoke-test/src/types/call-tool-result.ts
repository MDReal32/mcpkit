import type { TextContent } from "./text-content";

export interface CallToolResult {
  content: TextContent[];
  isError?: boolean;
}
