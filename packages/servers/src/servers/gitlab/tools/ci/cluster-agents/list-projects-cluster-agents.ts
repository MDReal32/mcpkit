import { defineTool } from "@usemcpkit/core";

export const ciClusterAgentsListProjectsClusterAgents = defineTool({
  name: "ci:cluster_agents:list_projects_cluster_agents",
  description:
    "List all agents. Lists all agents registered for the project. You must have the Developer, Maintainer, or Owner role to use this endpoint.",
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
    path: "/projects/{id}/cluster_agents",
    query: ["page", "per_page"],
  },
});
