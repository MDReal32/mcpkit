import { assertNoInlineTomlEntry } from './assert-no-inline-toml-entry';
import { findTomlTable } from './find-toml-table';
import { formatTomlTable } from './format-toml-table';
import { toTomlTableKey } from './to-toml-table-key';

/** Replaces the `[servers.name]` key/value lines in place (keeping its subtables and comments elsewhere) or appends it. */
export const upsertTomlTable = (
  text: string,
  serversPath: readonly string[],
  name: string,
  entry: Record<string, unknown>,
  path: string,
) => {
  const tableKey = toTomlTableKey(serversPath, name);
  const lines = text.split('\n');
  const table = formatTomlTable(tableKey, entry);
  const range = findTomlTable(lines, tableKey, false);
  if (range) {
    const trailingBlank = lines.slice(range.start, range.end).at(-1)?.trim() === '' ? [''] : [];
    return [...lines.slice(0, range.start), ...table, ...trailingBlank, ...lines.slice(range.end)].join('\n');
  }
  assertNoInlineTomlEntry(text, serversPath, name, path);
  const body = text.trimEnd();
  return `${body ? `${body}\n\n` : ''}${table.join('\n')}\n`;
};
