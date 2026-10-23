import { findTomlTable } from "./find-toml-table";
import { toTomlTableKey } from "./to-toml-table-key";

export const removeTomlTable = (text: string, serversPath: readonly string[], name: string) => {
  const lines = text.split("\n");
  const range = findTomlTable(lines, toTomlTableKey(serversPath, name), true);
  if (!range) {
    return text;
  }
  return [...lines.slice(0, range.start), ...lines.slice(range.end)].join("\n");
};
