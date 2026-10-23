import { defineTool } from '@usemcpkit/core';

export const ciClusterAgentsListProjectsClusterAgentsTokens = defineTool({
  name: 'ci:cluster_agents:list_projects_cluster_agents_tokens',
  description:
    'List all agent tokens. Lists all active tokens for an agent. You must have the Developer, Maintainer, or Owner role to use this endpoint.',
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
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'agent_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/cluster_agents/{agent_id}/tokens',
    query: ['page', 'per_page'],
  },
});
