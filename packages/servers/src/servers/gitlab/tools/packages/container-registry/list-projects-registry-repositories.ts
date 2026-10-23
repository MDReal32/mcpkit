import { defineTool } from "@usemcpkit/core";

export const packagesContainerRegistryListProjectsRegistryRepositories = defineTool({
  name: "packages:container_registry:list_projects_registry_repositories",
  description:
    "List all registry repositories for a project. Lists all registry repositories for a specified project. Responses are paginated and return 20 results by default.",
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
      tags: {
        type: "boolean",
        default: false,
        description: "If `true`, includes an array of `tags` in the response.",
      },
      tags_count: {
        type: "boolean",
        default: false,
        description: "If `true`, includes `tags_count` in the response.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/registry/repositories",
    query: ["page", "per_page", "tags", "tags_count"],
  },
});
