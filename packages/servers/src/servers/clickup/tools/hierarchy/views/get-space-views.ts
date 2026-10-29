import { defineTool } from "@usemcpkit/core";

export const hierarchyViewsGetSpaceViews = defineTool({
  name: "hierarchy:views:get_space_views",
  description: "Get Space Views. View the task and page views available for a Space.",
  input: {
    type: "object",
    properties: {
      space_id: {
        type: "number",
      },
    },
    required: ["space_id"],
  },
  request: {
    method: "GET",
    path: "/v2/space/{space_id}/view",
  },
});
