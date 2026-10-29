import { defineTool } from "@usemcpkit/core";

export const hierarchyViewsGetListViews = defineTool({
  name: "hierarchy:views:get_list_views",
  description:
    "Get List Views. View the task and page views available for a List.\\ \\ Views and required views are separate responses.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
    },
    required: ["list_id"],
  },
  request: {
    method: "GET",
    path: "/v2/list/{list_id}/view",
  },
});
