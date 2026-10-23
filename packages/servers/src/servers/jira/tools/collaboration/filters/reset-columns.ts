import { defineTool } from "@usemcpkit/core";

export const collaborationFiltersResetColumns = defineTool({
  name: "collaboration:filters:reset_columns",
  description: "Reset columns. Reset the user's column configuration for the filter to the default.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the filter.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/filter/{id}/columns",
  },
});
