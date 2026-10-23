import { defineTool } from '@usemcpkit/core';

export const projectsProtectedBranchesListGroupsProtectedBranches = defineTool({
  name: 'projects:protected_branches:list_groups_protected_branches',
  description:
    'List all protected branches. Lists all protected branches from a group. If a wildcard is set, it is returned instead of the exact name of the branches that match that wildcard.',
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
      search: {
        type: 'string',
        description: 'Name or part of the name of protected branches to search for.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/protected_branches',
    query: ['page', 'per_page', 'search'],
  },
});
