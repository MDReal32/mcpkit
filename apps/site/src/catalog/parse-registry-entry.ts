import { readString } from "./read-string";
import type { RegistryEntry } from "./types";

export const parseRegistryEntry = (value: unknown, position: number) => {
  if (typeof value !== "object" || value === null) {
    throw new Error(`index.json: server ${position} is not an object`);
  }
  const record = value as Record<string, unknown>;
  const entry: RegistryEntry = {
    id: readString(record, "id", position),
    version: readString(record, "version", position),
    description: readString(record, "description", position),
    upstream: record.upstream === true,
    url: readString(record, "url", position),
  };
  return entry;
};
