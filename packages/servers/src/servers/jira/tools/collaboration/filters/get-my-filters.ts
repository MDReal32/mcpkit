import { defineTool } from "@usemcpkit/core";

export const collaborationFiltersGetMyFilters = defineTool({
  name: "collaboration:filters:get_my_filters",
  description:
    "Get my filters. Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are also returned.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
      includeFavourites: {
        type: "boolean",
        default: false,
        description: "Include the user's favorite filters in the response.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/filter/my",
    query: ["expand", "includeFavourites"],
  },
});
