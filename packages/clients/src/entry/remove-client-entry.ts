import { readConfigText } from "../config/read-config-text";
import { writeConfigText } from "../config/write-config-text";
import { OWNED_ENTRY_NAMES } from "../const";
import type { ClientDefinition } from "../types/client-definition";
import { removeNamedEntries } from "./remove-named-entries";

/** Removes the `usemcpkit` entry and any older-named one; resolves false when the file has neither, without touching it. */
export const removeClientEntry = async (definition: ClientDefinition, path: string) => {
  const text = await readConfigText(path);
  const { updated, removed } = removeNamedEntries(definition, text, path, OWNED_ENTRY_NAMES);
  if (!removed) {
    return false;
  }
  await writeConfigText(path, updated);
  return true;
};
