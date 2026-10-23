import { defineTool } from "@usemcpkit/core";

export const collaborationFiltersSetFavouriteForFilter = defineTool({
  name: "collaboration:filters:set_favourite_for_filter",
  description: "Add filter as favorite. Add a filter as a favorite for the user.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the filter.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/filter/{id}/favourite",
    query: ["expand"],
  },
});
