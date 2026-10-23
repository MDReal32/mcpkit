import { defineTool } from "@usemcpkit/core";

export const groupsGroupsListGroupsUploads = defineTool({
  name: "groups:groups:list_groups_uploads",
  description:
    "List all uploads for a group. Lists all uploads for a specified group sorted by `created_at` in descending order. You must have the Maintainer or Owner role for the group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/uploads",
    query: ["page", "per_page"],
  },
});
