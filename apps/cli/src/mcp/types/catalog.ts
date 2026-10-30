import type { Manifest } from "@usemcpkit/core";
import type { UpstreamServer } from "../../upstream";
import type { CatalogServer } from "./catalog-server";

/** What the server knows without downloading anything, plus a way to get one server's manifest. */
export interface Catalog {
  servers: readonly CatalogServer[];
  /** The server behind an upstream catalog server, started and asked for its tools on first use; undefined for the others. */
  loadUpstream?: (id: string) => Promise<UpstreamServer | undefined>;
  /** The manifest holding `tool`, a tool name without the server id. */
  loadManifest: (id: string, tool: string) => Promise<Manifest>;
  /** The group names of a server split into parts; empty when its tools are in one manifest. */
  loadGroups: (id: string) => Promise<readonly string[]>;
  /** The manifest holding the tools of `group`; the whole manifest for a server that is not split. */
  loadGroupManifest: (id: string, group?: string) => Promise<Manifest>;
  /** Stops what serving started, such as upstream server processes. */
  close?: () => Promise<void>;
}
