import { defineTool } from '@usemcpkit/core';

export const projectsBranchesCreateProjectsRepositoryBranches = defineTool({
  name: 'projects:branches:create_projects_repository_branches',
  description: 'Create a repository branch. Creates a branch in the repository.',
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
      ref: {
        type: 'string',
        description: 'Branch name or commit SHA to create the branch from.',
      },
    },
    required: ['id', 'branch', 'ref'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/repository/branches',
    body: ['branch', 'ref'],
  },
});
