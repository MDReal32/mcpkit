import { defineTool } from '@usemcpkit/core';

export const activityStarRepoForAuthenticatedUser = defineTool({
  name: 'activity:star_repo_for_authenticated_user',
  description:
    'Star a repository for the authenticated user. Note that you\'ll need to set `Content-Length` to zero when calling out to this endpoint. For more information, see "HTTP method."',
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
    method: 'PUT',
    path: '/user/starred/{owner}/{repo}',
  },
});
