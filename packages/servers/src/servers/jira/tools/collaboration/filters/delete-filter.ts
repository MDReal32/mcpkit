import { defineTool } from "@usemcpkit/core";

export const collaborationFiltersDeleteFilter = defineTool({
  name: "collaboration:filters:delete_filter",
  description: "Delete filter. Delete a filter.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the filter to delete.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/filter/{id}",
  },
});
