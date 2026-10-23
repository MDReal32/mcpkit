import { defineTool } from '@usemcpkit/core';

export const reposReposDeleteReleaseAsset = defineTool({
  name: 'repos:repos:delete_release_asset',
  description: 'Delete a release asset',
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
      asset_id: {
        type: 'integer',
        description: 'The unique identifier of the asset.',
      },
    },
    required: ['owner', 'repo', 'asset_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/releases/assets/{asset_id}',
  },
});
