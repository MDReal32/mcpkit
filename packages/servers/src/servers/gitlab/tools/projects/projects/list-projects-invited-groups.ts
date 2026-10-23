import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsInvitedGroups = defineTool({
  name: "projects:projects:list_projects_invited_groups",
  description:
    "List all invited groups in a project. Lists all invited groups in a project. Unauthenticated requests return only public invited groups. Limited to 60 requests a minute per user account for authenticated requires and per IP address for unauthenticated requests. Supports offset-based pagination (up to 50,000 projects) and keyset-based pagination (greater than 50,000 projects).",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      relation: {
        type: "string",
        description: "Filter groups by relation. (comma-separated)",
      },
      search: {
        type: "string",
        description: "Return the list of authorized groups matching the search criteria.",
      },
      min_access_level: {
        type: "integer",
        enum: [10, 15, 20, 25, 30, 40, 50],
        description:
          "Return results where the current user has at least the specified access level. For a list of values, see roles.",
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
    path: "/projects/{id}/invited_groups",
    query: [
      "relation",
      "search",
      "min_access_level",
      "page",
      "per_page",
      "with_custom_attributes",
      "custom_attributes",
    ],
    commaQuery: ["relation"],
  },
});
