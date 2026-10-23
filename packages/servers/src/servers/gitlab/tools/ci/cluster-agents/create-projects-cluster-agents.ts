import { defineTool } from '@usemcpkit/core';

export const ciClusterAgentsCreateProjectsClusterAgents = defineTool({
  name: 'ci:cluster_agents:create_projects_cluster_agents',
  description:
    'Create an agent. Creates an agent for the project. You must have the Maintainer or Owner role to use this endpoint.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the agent.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/cluster_agents',
    body: ['name'],
  },
});
