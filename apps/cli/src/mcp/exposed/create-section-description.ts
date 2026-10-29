import type { CatalogServer } from "../types/catalog-server";

const SECTION_NOTICE = "This is a SECTION of mcpkit, not a callable tool.";

export const createServerSectionDescription = (server: CatalogServer) =>
  `${server.description ?? server.id}. ${SECTION_NOTICE} Call it with no arguments to open it: it lists its groups ` +
  "(each one another section) or, when it has none, loads its tools into the tool list.";

export const createGroupSectionDescription = (server: CatalogServer, group: string) =>
  `Group "${group}" of ${server.id}. ${SECTION_NOTICE} Call it with no arguments to load its tools into the tool list.`;
