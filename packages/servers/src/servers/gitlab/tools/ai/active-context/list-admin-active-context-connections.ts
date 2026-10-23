import { defineTool } from "@usemcpkit/core";

export const aiActiveContextListAdminActiveContextConnections = defineTool({
  name: "ai:active_context:list_admin_active_context_connections",
  description:
    "Get all ActiveContext connections. Returns every ActiveContext connection configured for this instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/admin/active_context/connections",
  },
});
