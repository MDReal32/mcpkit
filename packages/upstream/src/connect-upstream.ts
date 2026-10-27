import type { UpstreamSpec } from "@usemcpkit/core";
import { CLIENT_NAME, MCP_PROTOCOL_VERSION } from "./const";
import { listAllTools } from "./session/list-all-tools";
import { createTransport } from "./transport/create-transport";
import type { UpstreamConnection } from "./types/upstream-connection";
import type { UpstreamOptions } from "./types/upstream-options";
import type { UpstreamResult } from "./types/upstream-result";

/** Starts the transport and runs the initialize handshake; the connection is ready for tools/list and tools/call. */
export const connectUpstream = async (spec: UpstreamSpec, options: UpstreamOptions = {}) => {
  const transport = createTransport(spec, options);
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
    close: () => transport.close(),
  };
  return connection;
};
