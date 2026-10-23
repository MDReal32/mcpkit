import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListUsersContributedProjects = defineTool({
  name: "projects:projects:list_users_contributed_projects",
  description:
    "List all projects contributions for a user. Lists all contributions to visible projects for a specified user. Returns only contributions in the past year.",
  input: {
    type: "object",
    properties: {
      user_id: {
        type: "string",
        description: "ID or username of the user.",
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
    },
    required: ["user_id"],
  },
  request: {
    method: "GET",
    path: "/users/{user_id}/contributed_projects",
    query: ["order_by", "sort", "page", "per_page", "simple"],
  },
});
