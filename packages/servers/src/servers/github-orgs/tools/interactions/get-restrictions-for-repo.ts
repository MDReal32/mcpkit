import { defineTool } from '@usemcpkit/core';

export const interactionsGetRestrictionsForRepo = defineTool({
  name: 'interactions:get_restrictions_for_repo',
  description:
    'Get interaction restrictions for a repository. Shows which type of GitHub user can interact with this repository and when the restriction expires. If there are no restrictions, you will see an empty response.',
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
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/interaction-limits',
  },
});
