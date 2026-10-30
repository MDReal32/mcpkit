import type { UpstreamSpec } from "@usemcpkit/core";
import { CLIENT_NAME, MCP_PROTOCOL_VERSION } from "./const";
import { prepareRepo } from "./repo/prepare-repo";
import { listAllTools } from "./session/list-all-tools";
import { createTransport } from "./transport/create-transport";
import type { UpstreamConnection } from "./types/upstream-connection";
import type { UpstreamOptions } from "./types/upstream-options";
import type { UpstreamResult } from "./types/upstream-result";
import { warnOnStderr } from "./warn-on-stderr";

/** Clones the repository of a stdio upstream if it has one and needs it (and keeps it up to date), starts the transport and runs the initialize handshake; the connection is ready for tools/list and tools/call. */
export const connectUpstream = async (spec: UpstreamSpec, options: UpstreamOptions = {}) => {
  const { checkRepo = true, warn = warnOnStderr } = options;
  const ready = spec.type === "stdio" ? await prepareRepo(spec, options.repoDir, { check: checkRepo, warn }) : spec;
  const transport = createTransport(ready, options);
  try {
    await transport.request("initialize", {
      protocolVersion: MCP_PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: { name: CLIENT_NAME, version: options.clientVersion ?? "0.0.0" },
    });
    await transport.notify("notifications/initialized");
  } catch (error) {
    await transport.close();
    throw error;
  }
  const connection: UpstreamConnection = {
    listTools: () => listAllTools(transport),
    callTool: async (name, args) =>
      (await transport.request("tools/call", { name, arguments: args ?? {} })) as UpstreamResult,
    isOpen: () => transport.isOpen(),
    close: () => transport.close(),
  };
  return connection;
};
