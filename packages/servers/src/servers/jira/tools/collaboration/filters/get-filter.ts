import { defineTool } from "@usemcpkit/core";

export const collaborationFiltersGetFilter = defineTool({
  name: "collaboration:filters:get_filter",
  description: "Get filter. Returns a filter.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the filter to return.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
      overrideSharePermissions: {
        type: "boolean",
        default: false,
        description:
          "EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be returned. Available to users with *Administer Jira* global permission.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/filter/{id}",
    query: ["expand", "overrideSharePermissions"],
  },
});
