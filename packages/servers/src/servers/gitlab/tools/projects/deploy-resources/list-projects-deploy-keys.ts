import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesListProjectsDeployKeys = defineTool({
  name: "projects:deploy_resources:list_projects_deploy_keys",
  description: "List all deploy keys for project. Lists all deploy keys for a specified project.",
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
    path: "/projects/{id}/deploy_keys",
    query: ["page", "per_page"],
  },
});
