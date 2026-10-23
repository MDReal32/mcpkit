import { defineTool } from "@usemcpkit/core";

export const projectsRepositoriesGetProjectsRepositoryContributors = defineTool({
  name: "projects:repositories:get_projects_repository_contributors",
  description: "Retrieve contributors metrics. Retrieves a list of contributors to a specified repository.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
      ref: {
        type: "string",
        description: "Name of a repository branch or tag. If omitted, uses the default branch.",
      },
      order_by: {
        type: "string",
        default: "commits",
        enum: ["email", "name", "commits"],
        description: "Sort results by the specified field.",
      },
      sort: {
        type: "string",
        default: "asc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/repository/contributors",
    query: ["page", "per_page", "ref", "order_by", "sort"],
  },
});
