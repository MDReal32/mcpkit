import { defineTool } from '@usemcpkit/core';

export const reposCreateFork = defineTool({
  name: 'repos:create_fork',
  description: 'Create a fork. Create a fork for the authenticated user.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      organization: {
        type: 'string',
        description: 'Optional parameter to specify the organization name if forking into an organization.',
      },
      name: {
        type: 'string',
        description: 'When forking from an existing repository, a new name for the fork.',
      },
      default_branch_only: {
        type: 'boolean',
        description: 'When forking from an existing repository, fork with only the default branch.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/forks',
    body: ['organization', 'name', 'default_branch_only'],
  },
});
