import { defineTool } from '@usemcpkit/core';

export const ciClusterAgentsDeleteProjectsClusterAgentsTokens = defineTool({
  name: 'ci:cluster_agents:delete_projects_cluster_agents_tokens',
  description:
    'Revoke an agent token. Revokes an agent token. You must have the Maintainer or Owner role to use this endpoint.',
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
      token_id: {
        type: 'integer',
        description: 'ID of the agent token.',
      },
    },
    required: ['id', 'agent_id', 'token_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/cluster_agents/{agent_id}/tokens/{token_id}',
  },
});
