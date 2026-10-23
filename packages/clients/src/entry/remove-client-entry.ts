import { readConfigText } from '../config/read-config-text';
import { removeJsonEntry } from '../config/remove-json-entry';
import { removeTomlTable } from '../config/remove-toml-table';
import { writeConfigText } from '../config/write-config-text';
import { ENTRY_NAME } from '../const';
import type { ClientDefinition } from '../types/client-definition';
import { hasClientEntry } from './has-client-entry';

/** Resolves false when the file has no `mcpkit` entry, without touching it. */
export const removeClientEntry = async (definition: ClientDefinition, path: string) => {
  const text = await readConfigText(path);
  if (!hasClientEntry(definition, text, path)) {
    return false;
  }
  const updated =
    definition.format === 'toml'
      ? removeTomlTable(text, definition.serversPath, ENTRY_NAME)
      : removeJsonEntry(text, definition.serversPath, ENTRY_NAME);
  await writeConfigText(path, updated);
  return true;
};
