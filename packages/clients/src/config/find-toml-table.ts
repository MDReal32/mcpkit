import type { TomlTableRange } from "../types/toml-table-range";
import { isTomlTableStart } from "./is-toml-table-start";
import { readTomlHeader } from "./read-toml-header";

/** Finds `[tableKey]` with its key/value lines; with `withSubtables`, also the `[tableKey.*]` tables right after it. */
export const findTomlTable = (lines: readonly string[], tableKey: string, withSubtables: boolean) => {
  const start = lines.findIndex((line) => readTomlHeader(line) === tableKey);
  if (start === -1) {
    return undefined;
  }
  let end = start + 1;
  while (end < lines.length) {
    const line = lines[end] ?? "";
    const isOwnSubtable = withSubtables && (readTomlHeader(line)?.startsWith(`${tableKey}.`) ?? false);
    if (isTomlTableStart(line) && !isOwnSubtable) {
      break;
    }
    end++;
  }
  const range: TomlTableRange = { start, end };
  return range;
};
