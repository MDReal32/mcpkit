import { defineTool } from '@usemcpkit/core';

export const ciProtectedEnvironmentsListGroupsProtectedEnvironments = defineTool({
  name: 'ci:protected_environments:list_groups_protected_environments',
  description: 'List all protected environments for a group. Lists all protected environments for a specified group.',
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
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/protected_environments',
    query: ['page', 'per_page'],
  },
});
