import { defineTool } from "@usemcpkit/core";

export const groupsGroupsListGroupsGroupsShared = defineTool({
  name: "groups:groups:list_groups_groups_shared",
  description: "List all shared groups. Lists all groups shared with a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      skip_groups: {
        type: "string",
        description: "Skip the specified group IDs. (comma-separated)",
      },
      visibility: {
        type: "string",
        enum: ["private", "internal", "public"],
        description: "Return groups with the specified visibility.",
      },
      search: {
        type: "string",
        description: "Return the list of authorized groups matching the search criteria.",
      },
      min_access_level: {
        type: "integer",
        enum: [10, 15, 20, 25, 30, 40, 50],
        description:
          "Return groups where the current user has at least the specified access level. For a list of values, see roles.",
      },
      order_by: {
        type: "string",
        default: "name",
        enum: ["name", "path", "id", "similarity"],
        description: "Sort results by the specified field.",
      },
      sort: {
        type: "string",
        default: "asc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
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
      with_custom_attributes: {
        type: "boolean",
        default: false,
        description: "If `true`, includes custom attributes in the response. Administrators only.",
      },
      custom_attributes: {
        type: "object",
        description:
          "Filter by custom attributes that match all of the specified key and value pairs. Administrators only.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/groups/shared",
    query: [
      "skip_groups",
      "visibility",
      "search",
      "min_access_level",
      "order_by",
      "sort",
      "page",
      "per_page",
      "with_custom_attributes",
      "custom_attributes",
    ],
  },
});
