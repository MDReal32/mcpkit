import type { ExecuteOptions, Manifest } from "@usemcpkit/core";
import { DISCOVERY_MAX_AGE_MS } from "./const";
import { openUpstream } from "./open-upstream";
import { readToolCache } from "./read-tool-cache";
import { toCatalogToolNames } from "./to-catalog-tool-names";
import type { DiscoveredTool } from "./types/discovered-tool";
import { writeToolCache } from "./write-tool-cache";

const discoverFromUpstream = async (manifest: Manifest, options: ExecuteOptions) => {
  const { connection, result } = await openUpstream(manifest, options, (opened) => opened.listTools());
  await connection.close();
  const names = toCatalogToolNames(result.map((tool) => tool.name));
  return result.map((tool, position) => {
    const discovered: DiscoveredTool = {
      name: names[position]?.name ?? tool.name,
      upstreamName: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    };
    return discovered;
  });
};

const refreshTools = async (
  dir: string,
  serverId: string,
  loadManifest: () => Promise<Manifest>,
  options: ExecuteOptions,
) => {
  const tools = await discoverFromUpstream(await loadManifest(), options);
  await writeToolCache(dir, serverId, { discoveredAt: new Date().toISOString(), tools });
  return tools;
};

/**
 * The tools of an upstream server. A cached list is returned at once, so starting never waits for an upstream; when it
 * is over a day old it is refreshed in the background and `onRefreshFailure` hears of a failure. Without a cache the
 * upstream is asked and its error surfaces.
 */
export const discoverTools = async (
  dir: string,
  serverId: string,
  loadManifest: () => Promise<Manifest>,
  options: ExecuteOptions,
  onRefreshFailure: (error: unknown) => void,
) => {
  const cached = await readToolCache(dir, serverId);
  if (!cached) {
    return refreshTools(dir, serverId, loadManifest, options);
  }
  if (Date.now() - Date.parse(cached.discoveredAt) >= DISCOVERY_MAX_AGE_MS) {
    refreshTools(dir, serverId, loadManifest, options).catch(onRefreshFailure);
  }
  return cached.tools;
};
