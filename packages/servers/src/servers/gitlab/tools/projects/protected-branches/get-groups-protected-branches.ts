import { defineTool } from '@usemcpkit/core';

export const projectsProtectedBranchesGetGroupsProtectedBranches = defineTool({
  name: 'projects:protected_branches:get_groups_protected_branches',
  description:
    'Retrieve a protected branch. Retrieves a specified protected branch. Retrieve multiple branches by using a wildcard in the `name`.',
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
    method: 'GET',
    path: '/groups/{id}/protected_branches/{name}',
  },
});
