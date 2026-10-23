import { defineTool } from "@usemcpkit/core";

export const groupsGroupsListGroupsBillableMembers = defineTool({
  name: "groups:groups:list_groups_billable_members",
  description:
    "List all billable group members. Lists all billable members of a specified top-level group. Includes members in any subgroups or projects. You must have the Owner role for the group.",
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
      search: {
        type: "string",
        description: "Query string to search for group members by name, username, or public email.",
      },
      sort: {
        type: "string",
        enum: [
          "access_level_asc",
          "access_level_desc",
          "last_joined",
          "name_asc",
          "name_desc",
          "oldest_joined",
          "oldest_sign_in",
          "recent_sign_in",
          "last_activity_on_asc",
          "last_activity_on_desc",
        ],
        description: "Sort results by the specified field and direction.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/billable_members",
    query: ["page", "per_page", "search", "sort"],
  },
});
