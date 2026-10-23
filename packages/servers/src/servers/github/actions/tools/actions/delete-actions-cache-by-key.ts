import { defineTool } from '@usemcpkit/core';

export const actionsDeleteActionsCacheByKey = defineTool({
  name: 'actions:delete_actions_cache_by_key',
  description:
    'Delete GitHub Actions caches for a repository (using a cache key). Deletes one or more GitHub Actions caches for a repository, using a complete cache key. By default, all caches that match the provided key are deleted, but you can optionally provide a Git ref to restrict deletions to caches that match both the provided key and the Git ref.',
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
      key: {
        type: 'string',
        description: 'A key for identifying the cache.',
      },
      ref: {
        type: 'string',
        description:
          'The full Git reference for narrowing down the cache. The `ref` for a branch should be formatted as `refs/heads/<branch name>`. To reference a pull request use `refs/pull/<number>/merge`.',
      },
    },
    required: ['owner', 'repo', 'key'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/actions/caches',
    query: ['key', 'ref'],
  },
});
