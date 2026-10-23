import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsUpdateGadget = defineTool({
  name: "collaboration:dashboards:update_gadget",
  description: "Update gadget on dashboard. Changes the title, position, and color of the gadget on a dashboard.",
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
      color: {
        type: "string",
        description:
          "The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`.",
      },
      position: {
        type: "object",
        description: "The position of the gadget.",
        properties: {
          "The column position of the gadget.": {
            type: "integer",
          },
          "The row position of the gadget.": {
            type: "integer",
          },
        },
        required: ["The column position of the gadget.", "The row position of the gadget."],
      },
      title: {
        type: "string",
        description: "The title of the gadget.",
      },
    },
    required: ["dashboardId", "gadgetId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/dashboard/{dashboardId}/gadget/{gadgetId}",
    body: ["color", "position", "title"],
  },
});
