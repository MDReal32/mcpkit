import { defineTool } from '@usemcpkit/core';

export const projectsProtectedBranchesListProjectsProtectedBranches = defineTool({
  name: 'projects:protected_branches:list_projects_protected_branches',
  description: 'List all protected branches. Lists all protected branches for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    path: '/projects/{id}/protected_branches',
    query: ['page', 'per_page', 'search'],
  },
});
