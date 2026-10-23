import { defineTool } from '@usemcpkit/core';

export const actionsActionsSetActionsCacheStorageLimitForRepository = defineTool({
  name: 'actions:actions:set_actions_cache_storage_limit_for_repository',
  description:
    'Set GitHub Actions cache storage limit for a repository. Sets GitHub Actions cache storage limit for a repository. This determines the maximum size of caches that can be stored before eviction occurs.',
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
      max_cache_size_gb: {
        type: 'integer',
        description: 'The maximum total cache size for this repository, in gigabytes.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/actions/cache/storage-limit',
    body: ['max_cache_size_gb'],
  },
});
