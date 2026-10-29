import type { ToolCallColors } from "../../components/tool-call-colors";
import type { ToolCallData } from "../assistant/tool-call-data";

export interface ClientWindowData {
  client: string;
  panel: string;
  prompt: string;
  call: ToolCallData;
  reply: string;
  background: string;
  chrome: string;
  colors: ToolCallColors;
  terminal: boolean;
}
