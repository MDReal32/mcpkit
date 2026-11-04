import { OWNED_ENTRY_NAMES } from "../const";
import type { ClientDefinition } from "../types/client-definition";
import { hasNamedEntry } from "./has-named-entry";

/** True when the file has the `usemcpkit` entry or one an older release wrote under its old name. */
export const hasClientEntry = (definition: ClientDefinition, text: string, path: string) =>
  OWNED_ENTRY_NAMES.some((name) => hasNamedEntry(definition, text, path, name));
