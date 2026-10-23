import { defineTool } from "@usemcpkit/core";

export const ciClustersListProjectsClusters = defineTool({
  name: "ci:clusters:list_projects_clusters",
  description: "List all clusters in a project. Lists all clusters in a specified project.",
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
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/clusters",
    query: ["page", "per_page"],
  },
});
