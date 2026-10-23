import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsForks = defineTool({
  name: "projects:projects:list_projects_forks",
  description: "List all forks of a project. Lists all forks of a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      order_by: {
        type: "string",
        default: "created_at",
        enum: [
          "id",
          "name",
          "path",
          "created_at",
          "updated_at",
          "last_activity_at",
          "similarity",
          "star_count",
          "storage_size",
          "repository_size",
          "wiki_size",
          "packages_size",
        ],
        description:
          "Return projects ordered by field. storage_size, repository_size, wiki_size, packages_size are only available to admins. Similarity is available when searching and is limited to projects the user has access to.",
      },
      sort: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
      },
      archived: {
        type: "boolean",
        description: "If `true`, returns only archived projects.",
      },
      visibility: {
        type: "string",
        enum: ["private", "internal", "public"],
        description: "Return projects with the specified visibility.",
      },
      search: {
        type: "string",
        description:
          "Return a list of projects with a `path`, `name`, or `description` matching the search criteria (case-insensitive, substring match). Multiple terms can be provided, separated by an escaped space, either `+` or `%20`, and are ANDed together. Example: `one+two` matches substrings `one` and `two` (in any order).",
      },
      search_namespaces: {
        type: "boolean",
        description: "If `true`, includes ancestor namespaces when matching search criteria.",
      },
      owned: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only projects explicitly owned by the current user.",
      },
      starred: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only projects starred by the current user.",
      },
      imported: {
        type: "boolean",
        default: false,
        description:
          "If `true`, returns only projects that were imported from external systems by the authenticated user.",
      },
      membership: {
        type: "boolean",
        default: false,
        description: "If `true`, returns only projects that the current user is a member of.",
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
      with_programming_language: {
        type: "string",
        description: "Return projects that use the given programming language.",
      },
      min_access_level: {
        type: "integer",
        enum: [10, 15, 20, 25, 30, 40, 50],
        description:
          "Return results where the current user has at least the specified access level. For a list of values, see roles.",
      },
      id_after: {
        type: "integer",
        description: "Return projects with IDs greater than the specified ID.",
      },
      id_before: {
        type: "integer",
        description: "Return projects with IDs less than the specified ID.",
      },
      last_activity_after: {
        type: "string",
        description: "Return projects with last activity after the specified time.",
      },
      last_activity_before: {
        type: "string",
        description: "Return projects with last activity before the specified time.",
      },
      repository_storage: {
        type: "string",
        description: "Return projects stored on the specified repository storage shard. Administrators only.",
      },
      topic: {
        type: "string",
        description: "Comma-separated list of topics. Return projects having all topics. (comma-separated)",
      },
      topic_id: {
        type: "integer",
        description: "Filter projects by the given topic ID.",
      },
      updated_before: {
        type: "string",
        description: "Return projects last updated on or before the specified time.",
      },
      updated_after: {
        type: "string",
        description: "Return projects last updated on or after the specified time.",
      },
      include_pending_delete: {
        type: "boolean",
        description: "If `true`, includes projects that are pending deletion in the response. Administrators only.",
      },
      marked_for_deletion_on: {
        type: "string",
        description:
          "Return projects that are marked for deletion on this date. Premium and Ultimate only. Introduced in GitLab 17.1.",
      },
      active: {
        type: "boolean",
        description: "If `true`, returns only projects that are not archived and not marked for deletion.",
      },
      wiki_checksum_failed: {
        type: "boolean",
        default: false,
        description:
          "If `true`, returns only projects whose wiki checksum calculation failed. Premium and Ultimate only.",
      },
      repository_checksum_failed: {
        type: "boolean",
        default: false,
        description:
          "If `true`, returns only projects whose repository checksum calculation failed. Premium and Ultimate only.",
      },
      include_hidden: {
        type: "boolean",
        default: false,
        description: "If `true`, includes hidden projects. Administrators only. Premium and Ultimate only.",
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
      simple: {
        type: "boolean",
        default: false,
        description:
          "If `true`, returns only limited fields for each project. Without authentication, only limited fields are returned regardless of this setting.",
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
    path: "/projects/{id}/forks",
    query: [
      "order_by",
      "sort",
      "archived",
      "visibility",
      "search",
      "search_namespaces",
      "owned",
      "starred",
      "imported",
      "membership",
      "with_issues_enabled",
      "with_merge_requests_enabled",
      "with_programming_language",
      "min_access_level",
      "id_after",
      "id_before",
      "last_activity_after",
      "last_activity_before",
      "repository_storage",
      "topic",
      "topic_id",
      "updated_before",
      "updated_after",
      "include_pending_delete",
      "marked_for_deletion_on",
      "active",
      "wiki_checksum_failed",
      "repository_checksum_failed",
      "include_hidden",
      "page",
      "per_page",
      "simple",
      "with_custom_attributes",
      "custom_attributes",
    ],
  },
});
