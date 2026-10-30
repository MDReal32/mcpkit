import type { ExecuteOptions, Manifest } from "@usemcpkit/core";
import type { UpstreamConnection } from "@usemcpkit/upstream";
import { openUpstream } from "./open-upstream";
import type { DiscoveredTool } from "./types/discovered-tool";
import type { UpstreamServer } from "./types/upstream-server";

/**
 * Keeps the connection between calls, so a stdio upstream is started once. A connection that closed is replaced before
 * the call; a call that failed is never retried, since it may already have run.
 */
export const createUpstreamServer = (loadManifest: () => Promise<Manifest>, tools: readonly DiscoveredTool[]) => {
  let kept: UpstreamConnection | undefined;
  const connect = async (options: ExecuteOptions) =>
    (await openUpstream(await loadManifest(), options, async () => undefined)).connection;
  const server: UpstreamServer = {
    tools: new Map(tools.map((tool) => [tool.name, tool])),
    call: async (tool, args, options) => {
      if (!kept?.isOpen()) {
        kept = await connect(options);
      }
      return kept.callTool(tool.upstreamName, args);
    },
    close: async () => {
      await kept?.close();
      kept = undefined;
    },
  };
  return server;
};
