import type { JsonContent } from "./json-content";
import type { TextContent } from "./text-content";

export interface CallToolResult {
  content: Array<TextContent | JsonContent>;
  isError?: boolean;
}
