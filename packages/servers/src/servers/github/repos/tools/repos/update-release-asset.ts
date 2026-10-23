import { defineTool } from '@usemcpkit/core';

export const reposUpdateReleaseAsset = defineTool({
  name: 'repos:update_release_asset',
  description: 'Update a release asset. Users with push access to the repository can edit a release asset.',
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
      name: {
        type: 'string',
        description: 'The file name of the asset.',
      },
      label: {
        type: 'string',
        description: 'An alternate short description of the asset. Used in place of the filename.',
      },
      state: {
        type: 'string',
      },
    },
    required: ['owner', 'repo', 'asset_id'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/releases/assets/{asset_id}',
    body: ['name', 'label', 'state'],
  },
});
