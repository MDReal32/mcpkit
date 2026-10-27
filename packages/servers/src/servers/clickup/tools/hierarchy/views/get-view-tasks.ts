import { defineTool } from "@usemcpkit/core";

export const hierarchyViewsGetViewTasks = defineTool({
  name: "hierarchy:views:get_view_tasks",
  description: "Get View Tasks. See all visible tasks in a view in ClickUp.",
  input: {
    type: "object",
    properties: {
      view_id: {
        type: "string",
        description: "105 (string)",
      },
      page: {
        type: "integer",
      },
    },
    required: ["view_id", "page"],
  },
  request: {
    method: "GET",
    path: "/v2/view/{view_id}/task",
    query: ["page"],
  },
});
