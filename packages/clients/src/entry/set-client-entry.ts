import { parseJsonConfig } from '../config/parse-json-config';
import { readConfigText } from '../config/read-config-text';
import { upsertJsonEntry } from '../config/upsert-json-entry';
import { upsertTomlTable } from '../config/upsert-toml-table';
import { writeConfigText } from '../config/write-config-text';
import { ENTRY_NAME } from '../const';
import type { ClientDefinition } from '../types/client-definition';
import type { LaunchCommand } from '../types/launch-command';

/** Writes the single `mcpkit` entry; every other key in the file is left as it was. */
export const setClientEntry = async (definition: ClientDefinition, path: string, launch: LaunchCommand) => {
  const text = await readConfigText(path);
  const entry = definition.createEntry(launch);
  if (definition.format === 'toml') {
    await writeConfigText(path, upsertTomlTable(text, definition.serversPath, ENTRY_NAME, entry, path));
    return;
  }
  parseJsonConfig(text, path);
  await writeConfigText(path, upsertJsonEntry(text, definition.serversPath, ENTRY_NAME, entry));
};
