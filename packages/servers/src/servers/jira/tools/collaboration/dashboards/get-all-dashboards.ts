import { defineTool } from "@usemcpkit/core";

export const collaborationDashboardsGetAllDashboards = defineTool({
  name: "collaboration:dashboards:get_all_dashboards",
  description:
    "Get all dashboards. Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or owned dashboards.",
  input: {
    type: "object",
    properties: {
      filter: {
        type: "string",
        enum: ["my", "favourite"],
        description: "The filter applied to the list of dashboards. Valid values are:",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 20,
        description: "The maximum number of items to return per page.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/dashboard",
    query: ["filter", "startAt", "maxResults"],
  },
});
