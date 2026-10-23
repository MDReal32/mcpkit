import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsDeleteDashboardItemProperty = defineTool({
  name: "collaboration:dashboards:delete_dashboard_item_property",
  description: "Delete dashboard item property. Deletes a dashboard item property.",
  input: {
    type: "object",
    properties: {
      dashboardId: {
        type: "string",
        description: "The ID of the dashboard.",
      },
      itemId: {
        type: "string",
        description: "The ID of the dashboard item.",
      },
      propertyKey: {
        type: "string",
        description: "The key of the dashboard item property.",
      },
    },
    required: ["dashboardId", "itemId", "propertyKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
  },
});
