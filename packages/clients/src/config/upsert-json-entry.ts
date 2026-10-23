import { applyEdits, modify } from 'jsonc-parser';
import { JSON_INDENT_SIZE } from '../const';

/** Sets `serversPath.name` to `entry`, keeping comments and the rest of the file as they are. */
export const upsertJsonEntry = (text: string, serversPath: readonly string[], name: string, entry: unknown) => {
  const edits = modify(text.trim() ? text : '{}', [...serversPath, name], entry, {
    formattingOptions: { insertSpaces: true, tabSize: JSON_INDENT_SIZE, eol: '\n' },
  });
  return applyEdits(text.trim() ? text : '{}', edits);
};
