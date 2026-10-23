import { defineTool } from '@usemcpkit/core';

export const ciClusterAgentsCreateProjectsClusterAgentsTokens = defineTool({
  name: 'ci:cluster_agents:create_projects_cluster_agents_tokens',
  description:
    'Create an agent token. Creates a token for an agent. You must have the Maintainer or Owner role to use this endpoint. An agent can have only two active tokens at one time.',
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
      name: {
        type: 'string',
        description: 'Name of the token.',
      },
      description: {
        type: 'string',
        description: 'Description of the token.',
      },
    },
    required: ['id', 'agent_id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/cluster_agents/{agent_id}/tokens',
    body: ['name', 'description'],
  },
});
