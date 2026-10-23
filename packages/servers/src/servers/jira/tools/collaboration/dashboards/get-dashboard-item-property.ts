import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsGetDashboardItemProperty = defineTool({
  name: "collaboration:dashboards:get_dashboard_item_property",
  description: "Get dashboard item property. Returns the key and value of a dashboard item property.",
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
    method: "GET",
    path: "/rest/api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
  },
});
