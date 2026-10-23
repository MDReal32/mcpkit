import { defineTool } from '@usemcpkit/core';

export const projectsProtectedBranchesGetProjectsProtectedBranches = defineTool({
  name: 'projects:protected_branches:get_projects_protected_branches',
  description:
    'Retrieve a protected branch or wildcard protected branch. Retrieves a specified protected branch or wildcard protected branch.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    path: '/projects/{id}/protected_branches/{name}',
  },
});
