import type { ExecuteOptions } from "@usemcpkit/core";
import { describeError } from "@usemcpkit/core";
import type { Catalog } from "../../mcp";
import type { RegistryContext, RegistryServer } from "../../registry";
import { loadManifest } from "../../registry";
import type { UpstreamServer } from "../../upstream";
import { createUpstreamServer, discoverTools } from "../../upstream";
import { printError } from "../output/print-error";

export interface HydratedServer {
  server: Catalog["servers"][number];
  upstream?: UpstreamServer;
}

/**
 * The catalog entry of an upstream server, its tools discovered from the upstream. A server that cannot be reached
 * stays listed without tools and says why in its description, so one broken upstream never stops the others.
 */
export const hydrateUpstreamServer = async (
  server: RegistryServer,
  context: RegistryContext,
  options: ExecuteOptions,
) => {
  const load = () => loadManifest(server, context, "");
  try {
    const tools = await discoverTools(context.dir, server.id, load, options, (error) =>
      printError(`${server.id}: could not refresh its tools: ${describeError(error)}`),
    );
    const hydrated: HydratedServer = {
      server: { ...server, tools: tools.map((tool) => tool.name) },
      upstream: createUpstreamServer(load, tools),
    };
    return hydrated;
  } catch (error) {
    const unavailable: HydratedServer = {
      server: { ...server, description: `${server.description ?? server.id} (unavailable: ${describeError(error)})` },
    };
    return unavailable;
  }
};
