import { defineTool } from '@usemcpkit/core';

export const projectsProtectedBranchesDeleteGroupsProtectedBranches = defineTool({
  name: 'projects:protected_branches:delete_groups_protected_branches',
  description:
    'Unprotect repository branches. Unprotects a specified protected branch Unprotect multiple branches by using a wildcard in the `name`.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      name: {
        type: 'string',
        description: 'Name of the branch or wildcard.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/protected_branches/{name}',
  },
});
