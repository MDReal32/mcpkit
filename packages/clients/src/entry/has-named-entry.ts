import { hasJsonEntry } from "../config/has-json-entry";
import { hasTomlTable } from "../config/has-toml-table";
import { parseJsonConfig } from "../config/parse-json-config";
import type { ClientDefinition } from "../types/client-definition";

export const hasNamedEntry = (definition: ClientDefinition, text: string, path: string, name: string) =>
  definition.format === "toml"
    ? hasTomlTable(text, definition.serversPath, name)
    : hasJsonEntry(parseJsonConfig(text, path), definition.serversPath, name);
