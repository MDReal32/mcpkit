import type { Manifest } from "@usemcpkit/core";
import type { UpstreamServer } from "../../upstream";
import type { CatalogServer } from "./catalog-server";

/** What the server knows without downloading anything, plus a way to get one server's manifest. */
export interface Catalog {
  servers: readonly CatalogServer[];
  /** Servers backed by another MCP server, by id; their tools are not in a manifest. */
  upstreams?: ReadonlyMap<string, UpstreamServer>;
  /** The manifest holding `tool`, a tool name without the server id. */
  loadManifest: (id: string, tool: string) => Promise<Manifest>;
}
