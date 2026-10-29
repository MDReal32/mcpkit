import { defineTool } from "@usemcpkit/core";

export const usersConnectionsListMyConnections = defineTool({
  name: "users:connections:list_my_connections",
  description: "",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/users/@me/connections",
  },
});
