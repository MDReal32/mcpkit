import { defineTool } from '@usemcpkit/core';

export const projectsDeployResourcesListGroupsDeployTokens = defineTool({
  name: 'projects:deploy_resources:list_groups_deploy_tokens',
  description: 'List all group deploy tokens. Lists all group deploy tokens.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
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
      active: {
        type: 'boolean',
        description: 'If `true`, returns only active deploy tokens.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/deploy_tokens',
    query: ['page', 'per_page', 'active'],
  },
});
