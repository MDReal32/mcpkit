import { defineTool } from '@usemcpkit/core';

export const actionsGetActionsCacheUsage = defineTool({
  name: 'actions:get_actions_cache_usage',
  description:
    'Get GitHub Actions cache usage for a repository. Gets GitHub Actions cache usage for a repository. The data fetched using this API is refreshed approximately every 5 minutes, so values returned from this endpoint may take at least 5 minutes to get updated.',
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
    path: '/repos/{owner}/{repo}/actions/cache/usage',
  },
});
