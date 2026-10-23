import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsGroups = defineTool({
  name: "projects:projects:list_projects_groups",
  description: "List all ancestor groups. Lists all ancestor groups for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      search: {
        type: "string",
        description: "Return groups matching the search criteria.",
      },
      skip_groups: {
        type: "string",
        description: "Skip the specified group IDs. (comma-separated)",
      },
      with_shared: {
        type: "boolean",
        default: false,
        description: "If `true`, includes groups the project is shared with.",
      },
      shared_visible_only: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only shared groups the authenticated user can access.",
      },
      shared_min_access_level: {
        type: "integer",
        enum: [10, 15, 20, 25, 30, 40, 50],
        description: "Return shared groups with at least the specified access level. For a list of values, see roles.",
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
    path: "/projects/{id}/groups",
    query: [
      "search",
      "skip_groups",
      "with_shared",
      "shared_visible_only",
      "shared_min_access_level",
      "page",
      "per_page",
    ],
  },
});
