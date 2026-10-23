import { defineTool } from "@usemcpkit/core";

export const ciClusterAgentsDeleteProjectsClusterAgents = defineTool({
  name: "ci:cluster_agents:delete_projects_cluster_agents",
  description:
    "Delete an agent. Deletes an existing agent registration. You must have the Maintainer or Owner role to use this endpoint.",
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
    method: "DELETE",
    path: "/projects/{id}/cluster_agents/{agent_id}",
  },
});
