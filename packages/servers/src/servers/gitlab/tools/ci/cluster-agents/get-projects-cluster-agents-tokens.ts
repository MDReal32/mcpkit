import { defineTool } from "@usemcpkit/core";

export const ciClusterAgentsGetProjectsClusterAgentsTokens = defineTool({
  name: "ci:cluster_agents:get_projects_cluster_agents_tokens",
  description:
    "Retrieve an agent token. Retrieves a specified agent token. You must have the Developer, Maintainer, or Owner role to use this endpoint. Returns a `404` if the agent token has been revoked.",
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
      token_id: {
        type: "integer",
        description: "ID of the agent token.",
      },
    },
    required: ["id", "agent_id", "token_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/cluster_agents/{agent_id}/tokens/{token_id}",
  },
});
