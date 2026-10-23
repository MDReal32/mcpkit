import { hasJsonEntry } from '../config/has-json-entry';
import { hasTomlTable } from '../config/has-toml-table';
import { parseJsonConfig } from '../config/parse-json-config';
import { ENTRY_NAME } from '../const';
import type { ClientDefinition } from '../types/client-definition';

export const hasClientEntry = (definition: ClientDefinition, text: string, path: string) =>
  definition.format === 'toml'
    ? hasTomlTable(text, definition.serversPath, ENTRY_NAME)
    : hasJsonEntry(parseJsonConfig(text, path), definition.serversPath, ENTRY_NAME);
