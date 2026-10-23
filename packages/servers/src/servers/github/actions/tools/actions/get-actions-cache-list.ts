import { defineTool } from '@usemcpkit/core';

export const actionsGetActionsCacheList = defineTool({
  name: 'actions:get_actions_cache_list',
  description: 'List GitHub Actions caches for a repository. Lists the GitHub Actions caches for a repository.',
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
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      ref: {
        type: 'string',
        description:
          'The full Git reference for narrowing down the cache. The `ref` for a branch should be formatted as `refs/heads/<branch name>`. To reference a pull request use `refs/pull/<number>/merge`.',
      },
      key: {
        type: 'string',
        description: 'An explicit key or prefix for identifying the cache',
      },
      sort: {
        type: 'string',
        default: 'last_accessed_at',
        enum: ['created_at', 'last_accessed_at', 'size_in_bytes'],
        description:
          'The property to sort the results by. `created_at` means when the cache was created. `last_accessed_at` means when the cache was last accessed. `size_in_bytes` is the size of the cache in bytes.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/actions/caches',
    query: ['per_page', 'page', 'ref', 'key', 'sort', 'direction'],
  },
});
