import { defineTool } from "@usemcpkit/core";

export const metaMcpGetMcp = defineTool({
  name: "meta:mcp:get_mcp",
  description: "Get MCP response listener. Listens for Model Context Protocol responses",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/mcp",
  },
});
