import { applyEdits, modify } from "jsonc-parser";
import { JSON_INDENT_SIZE } from "../const";

export const removeJsonEntry = (text: string, serversPath: readonly string[], name: string) => {
  const edits = modify(text, [...serversPath, name], undefined, {
    formattingOptions: { insertSpaces: true, tabSize: JSON_INDENT_SIZE, eol: "\n" },
  });
  return applyEdits(text, edits);
};
