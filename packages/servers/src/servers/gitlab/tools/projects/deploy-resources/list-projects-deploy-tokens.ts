import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesListProjectsDeployTokens = defineTool({
  name: "projects:deploy_resources:list_projects_deploy_tokens",
  description: "List all project deploy tokens. Lists all project deploy tokens.",
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
      active: {
        type: "boolean",
        description: "If `true`, returns only active deploy tokens.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/deploy_tokens",
    query: ["page", "per_page", "active"],
  },
});
