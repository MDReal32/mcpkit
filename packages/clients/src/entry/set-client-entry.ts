import { parseJsonConfig } from "../config/parse-json-config";
import { readConfigText } from "../config/read-config-text";
import { upsertJsonEntry } from "../config/upsert-json-entry";
import { upsertTomlTable } from "../config/upsert-toml-table";
import { writeConfigText } from "../config/write-config-text";
import { ENTRY_NAME, LEGACY_ENTRY_NAMES } from "../const";
import type { ClientDefinition } from "../types/client-definition";
import type { LaunchCommand } from "../types/launch-command";
import { removeNamedEntries } from "./remove-named-entries";

/**
 * Writes the single `usemcpkit` entry and drops an older-named one, so the client never starts two; every other key in
 * the file is left as it was.
 */
export const setClientEntry = async (definition: ClientDefinition, path: string, launch: LaunchCommand) => {
  const text = await readConfigText(path);
  const entry = definition.createEntry(launch);
  if (definition.format !== "toml") {
    parseJsonConfig(text, path);
  }
  const upserted =
    definition.format === "toml"
      ? upsertTomlTable(text, definition.serversPath, ENTRY_NAME, entry, path)
      : upsertJsonEntry(text, definition.serversPath, ENTRY_NAME, entry);
  await writeConfigText(path, removeNamedEntries(definition, upserted, path, LEGACY_ENTRY_NAMES).updated);
};
