import type { UpstreamNameRule } from "@usemcpkit/core";

/** The PyPI package (double "y") with the `mcp` extra that brings the `graphify-mcp` server, pinned. */
export const GRAPHIFY_PACKAGE = "graphifyy[mcp]==0.9.111";

/**
 * Graphify's server names its tools `<verb>_<object>` (`get_neighbors`, `list_prs`); these rules file them as
 * `<group>:<resource>:<action>` like the other servers.
 */
export const GRAPHIFY_NAMING: readonly UpstreamNameRule[] = [
  { match: "^query_graph$", name: "graph:graph:query" },
  { match: "^graph_stats$", name: "graph:graph:get_stats" },
  { match: "^get_(node|section)$", name: "graph:$1s:get" },
  { match: "^get_community$", name: "graph:communities:get" },
  { match: "^get_neighbors$", name: "graph:nodes:list_neighbors" },
  { match: "^god_nodes$", name: "graph:nodes:list_god_nodes" },
  { match: "^shortest_path$", name: "graph:paths:find_shortest" },
  { match: "^(list|triage)_prs$", name: "prs:prs:$1" },
  { match: "^get_pr_impact$", name: "prs:prs:get_impact" },
];
