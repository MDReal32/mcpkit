import type { ExecuteOptions } from "@usemcpkit/core";
import { describeError } from "@usemcpkit/core";
import type { RegistryContext, RegistryServer } from "../../registry";
import { loadManifest } from "../../registry";
import { createUpstreamServer, discoverTools } from "../../upstream";
import { printError } from "../output/print-error";

/**
 * The upstream server behind a catalog entry, with its tools discovered: from the cache when there is one, otherwise by
 * starting it (which clones and sets up its repository the first time). Called when the server is first opened, never at
 * start, so a server nobody uses costs nothing.
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
    return createUpstreamServer(load, tools);
  } catch (error) {
    throw new Error(`${server.id} is unavailable: ${describeError(error)}`);
  }
};
