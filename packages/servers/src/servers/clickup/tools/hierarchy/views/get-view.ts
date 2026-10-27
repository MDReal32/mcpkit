import { defineTool } from "@usemcpkit/core";

export const hierarchyViewsGetView = defineTool({
  name: "hierarchy:views:get_view",
  description:
    "Get View. View information about a specific task or page view. The information returned about a view varies by the type of view.",
  input: {
    type: "object",
    properties: {
      view_id: {
        type: "string",
      },
    },
    required: ["view_id"],
  },
  request: {
    method: "GET",
    path: "/v2/view/{view_id}",
  },
});
