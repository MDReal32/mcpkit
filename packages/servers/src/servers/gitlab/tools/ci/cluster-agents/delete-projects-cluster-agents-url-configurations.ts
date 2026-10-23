import { defineTool } from "@usemcpkit/core";

export const ciClusterAgentsDeleteProjectsClusterAgentsUrlConfigurations = defineTool({
  name: "ci:cluster_agents:delete_projects_cluster_agents_url_configurations",
  description:
    "Delete an agent URL configuration. Deletes an agent URL configuration. You must have the Maintainer or Owner role to use this endpoint. This feature was introduced in GitLab 17.4.",
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
      url_configuration_id: {
        type: "integer",
        description: "ID of the agent URL configuration.",
      },
    },
    required: ["id", "agent_id", "url_configuration_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/cluster_agents/{agent_id}/url_configurations/{url_configuration_id}",
  },
});
