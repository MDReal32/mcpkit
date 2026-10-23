import { defineTool } from "@usemcpkit/core";

export const packagesContainerRegistryListProjectsRegistryRepositoriesTags = defineTool({
  name: "packages:container_registry:list_projects_registry_repositories_tags",
  description:
    "List all registry repository tags for a project. Lists all tags for a specified registry repository. Responses are paginated and return 20 results by default.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      repository_id: {
        type: "integer",
        description: "ID of the container registry repository.",
      },
      order_by: {
        type: "string",
        default: "name",
        description: "Field to order tags by. `published_at` requires keyset pagination.",
      },
      sort: {
        type: "string",
        default: "asc",
        description: "Direction to sort tags in. Only applies to keyset pagination.",
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
    required: ["id", "repository_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/registry/repositories/{repository_id}/tags",
    query: ["order_by", "sort", "page", "per_page"],
  },
});
