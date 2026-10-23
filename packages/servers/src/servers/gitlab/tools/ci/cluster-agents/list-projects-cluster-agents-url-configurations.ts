import { defineTool } from '@usemcpkit/core';

export const ciClusterAgentsListProjectsClusterAgentsUrlConfigurations = defineTool({
  name: 'ci:cluster_agents:list_projects_cluster_agents_url_configurations',
  description:
    'List all agent URL configurations. Lists all agent URL configurations for a specified agent. You must have the Developer, Maintainer, or Owner role to use this endpoint. This feature was introduced in GitLab 17.4.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      agent_id: {
        type: 'integer',
        description: 'ID of the agent.',
      },
    },
    required: ['id', 'agent_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/cluster_agents/{agent_id}/url_configurations',
  },
});
