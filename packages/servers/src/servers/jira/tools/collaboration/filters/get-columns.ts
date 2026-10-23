import { defineTool } from "@usemcpkit/core";

export const collaborationFiltersGetColumns = defineTool({
  name: "collaboration:filters:get_columns",
  description:
    "Get columns. Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed in *List View* with the *Columns* set to *Filter*.",
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
    method: "GET",
    path: "/rest/api/2/filter/{id}/columns",
  },
});
