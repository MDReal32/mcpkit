import type { TextContent } from "./text-content";

export interface CallToolResult {
  content: TextContent[];
  structuredContent?: unknown;
  isError?: boolean;
  resultType: string;
}
