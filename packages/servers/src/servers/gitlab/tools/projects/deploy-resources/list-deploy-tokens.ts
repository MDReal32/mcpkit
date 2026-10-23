import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesListDeployTokens = defineTool({
  name: 'projects:deploy_resources:list_deploy_tokens',
  description: 'List all deploy tokens. Lists all deploy tokens for the instance.',
  input: {
    type: 'object',
    properties: {
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
      active: {
        type: 'boolean',
        description: 'If `true`, returns only active deploy tokens.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/deploy_tokens',
    query: ['page', 'per_page', 'active'],
  },
});
