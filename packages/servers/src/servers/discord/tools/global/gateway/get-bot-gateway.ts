import { defineTool } from "@usemcpkit/core";

export const globalGatewayGetBotGateway = defineTool({
  name: "global:gateway:get_bot_gateway",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/gateway/bot",
  },
});
