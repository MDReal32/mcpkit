import { createJsonResult } from "../tools/create-json-result";
import type { Catalog } from "../types/catalog";

export const listServers = (catalog: Catalog) => createJsonResult(catalog.servers.map((server) => server.id));
