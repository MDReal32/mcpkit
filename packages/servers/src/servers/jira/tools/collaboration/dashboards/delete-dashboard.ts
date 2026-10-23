import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsDeleteDashboard = defineTool({
  name: "collaboration:dashboards:delete_dashboard",
  description: "Delete dashboard. Deletes a dashboard.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the dashboard.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/dashboard/{id}",
  },
});
