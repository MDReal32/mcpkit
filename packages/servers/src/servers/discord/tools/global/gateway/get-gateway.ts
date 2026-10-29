import { defineTool } from "@usemcpkit/core";

export const globalGatewayGetGateway = defineTool({
  name: "global:gateway:get_gateway",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/gateway",
  },
});
