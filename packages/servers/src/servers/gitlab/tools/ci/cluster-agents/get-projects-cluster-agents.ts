import { defineTool } from "@usemcpkit/core";

export const ciClusterAgentsGetProjectsClusterAgents = defineTool({
  name: "ci:cluster_agents:get_projects_cluster_agents",
  description:
    "Retrieve details on an agent. Retrieves details on a specified agent. You must have the Developer, Maintainer, or Owner role to use this endpoint.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      agent_id: {
        type: "integer",
        description: "ID of the agent.",
      },
    },
    required: ["id", "agent_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/cluster_agents/{agent_id}",
  },
});
