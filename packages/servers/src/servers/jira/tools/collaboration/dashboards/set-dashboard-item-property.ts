import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsSetDashboardItemProperty = defineTool({
  name: "collaboration:dashboards:set_dashboard_item_property",
  description:
    "Set dashboard item property. Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard item.",
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
        description:
          'The key of the dashboard item property. The maximum length is 255 characters. For dashboard items with a spec URI and no complete module key, if the provided propertyKey is equal to "config", the request body\'s JSON must be an object with all keys and values as strings.',
      },
      body: {},
    },
    required: ["dashboardId", "itemId", "propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}",
    bodyArg: "body",
  },
});
