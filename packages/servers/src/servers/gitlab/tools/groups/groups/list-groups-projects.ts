import { defineTool } from "@usemcpkit/core";

export const groupsGroupsListGroupsProjects = defineTool({
  name: "groups:groups:list_groups_projects",
  description:
    "List all projects in a group. Lists all projects in a specified group accessible to the authenticated user. Unauthenticated requests return only public projects with a limited subset of attributes.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      active: {
        type: "boolean",
        description:
          "If `true`, returns active projects. If `false`, returns projects that are archived or marked for deletion. Introduced in GitLab 18.8.",
      },
      archived: {
        type: "boolean",
        description: "If `true`, returns only archived groups or projects.",
      },
      visibility: {
        type: "string",
        enum: ["private", "internal", "public"],
        description: "Return groups with the specified visibility.",
      },
      search: {
        type: "string",
        description: "Return the list of authorized projects matching the search criteria.",
      },
      order_by: {
        type: "string",
        default: "created_at",
        enum: ["id", "name", "path", "created_at", "updated_at", "last_activity_at", "similarity", "star_count"],
        description: "Sort results by the specified field.",
      },
      sort: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
      },
      simple: {
        type: "boolean",
        default: false,
        description:
          "If `true`, returns only limited fields for each project. Without authentication, only limited fields are returned regardless of this setting.",
      },
      owned: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only groups explicitly owned by the current user.",
      },
      starred: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only projects starred by the current user.",
      },
      with_issues_enabled: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only projects that have the issues feature enabled.",
      },
      with_merge_requests_enabled: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only projects that have the merge requests feature enabled.",
      },
      with_shared: {
        type: "boolean",
        default: true,
        description: "If `true`, includes projects shared with the group.",
      },
      include_subgroups: {
        type: "boolean",
        default: false,
        description: "If `true`, includes projects in subgroups of this group.",
      },
      include_ancestor_groups: {
        type: "boolean",
        default: false,
        description: "If `true`, includes projects in the ancestors of this group.",
      },
      min_access_level: {
        type: "integer",
        enum: [10, 15, 20, 25, 30, 40, 50],
        description:
          "Return projects where the current user has at least the specified access level. For a list of values, see roles.",
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
      with_security_reports: {
        type: "boolean",
        default: false,
        description:
          "If `true`, returns only projects that have security report artifacts present in any of their builds. Ultimate only.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/projects",
    query: [
      "active",
      "archived",
      "visibility",
      "search",
      "order_by",
      "sort",
      "simple",
      "owned",
      "starred",
      "with_issues_enabled",
      "with_merge_requests_enabled",
      "with_shared",
      "include_subgroups",
      "include_ancestor_groups",
      "min_access_level",
      "page",
      "per_page",
      "with_custom_attributes",
      "custom_attributes",
      "with_security_reports",
    ],
  },
});
