import { parseRegistryEntry } from "./parse-registry-entry";
import { readServerList } from "./read-server-list";
import { toCatalogServer } from "./to-catalog-server";

/** Reads the registry's `index.json` on every call, so the catalog always shows what the CLI would download. */
export const fetchCatalogServers = async (indexUrl: string) => {
  const response = await fetch(indexUrl, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`index.json answered ${response.status} ${response.statusText}`);
  }
  const servers = readServerList(await response.json());
  return servers
    .map((value, position) => toCatalogServer(parseRegistryEntry(value, position), indexUrl))
    .sort((left, right) => left.category.localeCompare(right.category) || left.name.localeCompare(right.name));
};
