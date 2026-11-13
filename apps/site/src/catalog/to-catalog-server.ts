import { SERVER_PRESENTATIONS } from "./const";
import type { CatalogServer, RegistryEntry } from "./types";
import { writeTagline } from "./write-tagline";

/** Splits `<category>:<name>` and resolves the manifest link against the index it came from, as the CLI does. */
export const toCatalogServer = (entry: RegistryEntry, indexUrl: string) => {
  const separator = entry.id.indexOf(":");
  if (separator <= 0) {
    throw new Error(`index.json: server id "${entry.id}" is not <category>:<name>`);
  }
  const name = entry.id.slice(separator + 1);
  const presentation = SERVER_PRESENTATIONS[entry.id];
  const server: CatalogServer = {
    id: entry.id,
    version: entry.version,
    description: entry.description,
    upstream: entry.upstream,
    category: entry.id.slice(0, separator),
    name,
    displayName: presentation?.name ?? name,
    tagline: presentation?.tagline ?? writeTagline(entry.description),
    manifestUrl: new URL(entry.url, indexUrl).href,
  };
  return server;
};
