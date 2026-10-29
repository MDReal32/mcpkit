import { ACTION_WORD_SEPARATOR } from "../annotations/const";
import { TOOL_ID_SEPARATOR } from "../tools/const";

export const readVerb = (tool: string) =>
  (tool.split(TOOL_ID_SEPARATOR).at(-1) ?? "").split(ACTION_WORD_SEPARATOR)[0] ?? "";
