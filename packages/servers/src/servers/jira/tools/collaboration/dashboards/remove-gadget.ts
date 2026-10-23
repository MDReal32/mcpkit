import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsRemoveGadget = defineTool({
  name: "collaboration:dashboards:remove_gadget",
  description: "Remove gadget from dashboard. Removes a dashboard gadget from a dashboard.",
  input: {
    type: "object",
    properties: {
      dashboardId: {
        type: "integer",
        description: "The ID of the dashboard.",
      },
      gadgetId: {
        type: "integer",
        description: "The ID of the gadget.",
      },
    },
    required: ["dashboardId", "gadgetId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/dashboard/{dashboardId}/gadget/{gadgetId}",
  },
});
