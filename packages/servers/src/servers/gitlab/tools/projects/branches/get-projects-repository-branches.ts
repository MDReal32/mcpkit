import { defineTool } from '@usemcpkit/core';

export const projectsBranchesGetProjectsRepositoryBranches = defineTool({
  name: 'projects:branches:get_projects_repository_branches',
  description: 'Retrieve a repository branch. Retrieves a specified project repository branch.',
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
    method: 'GET',
    path: '/projects/{id}/repository/branches/{branch}',
  },
});
