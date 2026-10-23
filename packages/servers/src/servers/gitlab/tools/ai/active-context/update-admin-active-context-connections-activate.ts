import { defineTool } from "@usemcpkit/core";

export const aiActiveContextUpdateAdminActiveContextConnectionsActivate = defineTool({
  name: "ai:active_context:update_admin_active_context_connections_activate",
  description:
    "Activate an ActiveContext connection. Activates the specified connection and deactivates the previously active connection, if any.",
  input: {
    type: "object",
    properties: {
      connection_id: {
        type: "integer",
        description: "ID of the connection.",
      },
    },
    required: ["connection_id"],
  },
  request: {
    method: "PUT",
    path: "/admin/active_context/connections/activate",
    body: ["connection_id"],
  },
});
