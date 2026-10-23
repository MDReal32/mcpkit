import { defineTool } from '@usemcpkit/core';

export const actionsGetActionsCacheRetentionLimitForRepository = defineTool({
  name: 'actions:get_actions_cache_retention_limit_for_repository',
  description:
    'Get GitHub Actions cache retention limit for a repository. Gets GitHub Actions cache retention limit for a repository. This determines how long caches will be retained for, if not manually removed or evicted due to size constraints.',
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
    path: '/repos/{owner}/{repo}/actions/cache/retention-limit',
  },
});
