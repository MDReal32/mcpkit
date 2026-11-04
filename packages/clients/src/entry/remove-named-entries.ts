import { removeJsonEntry } from "../config/remove-json-entry";
import { removeTomlTable } from "../config/remove-toml-table";
import type { ClientDefinition } from "../types/client-definition";
import { hasNamedEntry } from "./has-named-entry";

/** The text without the entries of `names` it has, and whether it had any. */
export const removeNamedEntries = (
  definition: ClientDefinition,
  text: string,
  path: string,
  names: readonly string[],
) => {
  let updated = text;
  let removed = false;
  for (const name of names) {
    if (!hasNamedEntry(definition, updated, path, name)) {
      continue;
    }
    updated =
      definition.format === "toml"
        ? removeTomlTable(updated, definition.serversPath, name)
        : removeJsonEntry(updated, definition.serversPath, name);
    removed = true;
  }
  return { updated, removed };
};
