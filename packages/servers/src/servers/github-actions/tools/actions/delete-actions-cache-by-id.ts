import { defineTool } from '@usemcpkit/core';

export const actionsDeleteActionsCacheById = defineTool({
  name: 'actions:delete_actions_cache_by_id',
  description:
    'Delete a GitHub Actions cache for a repository (using a cache ID). Deletes a GitHub Actions cache for a repository, using a cache ID.',
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
      cache_id: {
        type: 'integer',
        description: 'The unique identifier of the GitHub Actions cache.',
      },
    },
    required: ['owner', 'repo', 'cache_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/actions/caches/{cache_id}',
  },
});
