import { defineTool } from '@usemcpkit/core';

export const projectsBranchesUpdateProjectsRepositoryBranchesUnprotect = defineTool({
  name: 'projects:branches:update_projects_repository_branches_unprotect',
  description: 'Unprotect a single branch. Removes the protection from a single protected branch.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      branch: {
        type: 'string',
        description: 'Name of the branch.',
      },
    },
    required: ['id', 'branch'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/repository/branches/{branch}/unprotect',
  },
});
