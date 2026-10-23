import { defineTool } from '@usemcpkit/core';

export const usersActivityCheckRepoIsStarredByAuthenticatedUser = defineTool({
  name: 'users:activity:check_repo_is_starred_by_authenticated_user',
  description:
    'Check if a repository is starred by the authenticated user. Whether the authenticated user has starred the repository.',
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
    path: '/user/starred/{owner}/{repo}',
  },
});
