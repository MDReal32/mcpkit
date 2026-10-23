import { defineTool } from '@usemcpkit/core';

export const activityGetRepoSubscription = defineTool({
  name: 'activity:get_repo_subscription',
  description:
    'Get a repository subscription. Gets information about whether the authenticated user is subscribed to the repository.',
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
    path: '/repos/{owner}/{repo}/subscription',
  },
});
