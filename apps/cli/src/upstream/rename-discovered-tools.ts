import type { UpstreamNameRule } from "@usemcpkit/core";
import { toCatalogToolNames } from "./to-catalog-tool-names";
import type { DiscoveredTool } from "./types/discovered-tool";

/** The tools with their catalog names worked out again from the manifest's current rules, so a cached list never keeps names an older manifest gave. */
export const renameDiscoveredTools = (tools: readonly DiscoveredTool[], naming?: readonly UpstreamNameRule[]) => {
  const names = toCatalogToolNames(
    tools.map((tool) => tool.upstreamName),
    naming,
  );
  return tools.map((tool, position) => ({ ...tool, name: names[position]?.name ?? tool.name }));
};
