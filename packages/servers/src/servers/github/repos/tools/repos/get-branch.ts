import { defineTool } from '@usemcpkit/core';

export const reposGetBranch = defineTool({
  name: 'repos:get_branch',
  description: 'Get a branch',
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
      branch: {
        type: 'string',
        description:
          'The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the GraphQL API.',
      },
    },
    required: ['owner', 'repo', 'branch'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/branches/{branch}',
  },
});
