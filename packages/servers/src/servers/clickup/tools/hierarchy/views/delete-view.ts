import { defineTool } from "@usemcpkit/core";

export const hierarchyViewsDeleteView = defineTool({
  name: "hierarchy:views:delete_view",
  description: "Delete View",
  input: {
    type: "object",
    properties: {
      view_id: {
        type: "string",
        description: "105 (string)",
      },
    },
    required: ["view_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/view/{view_id}",
  },
});
