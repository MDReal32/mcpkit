import { defineTool } from '@usemcpkit/core';

export const reposReposDeleteRelease = defineTool({
  name: 'repos:repos:delete_release',
  description: 'Delete a release. Users with push access to the repository can delete a release.',
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
      release_id: {
        type: 'integer',
        description: 'The unique identifier of the release.',
      },
    },
    required: ['owner', 'repo', 'release_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/releases/{release_id}',
  },
});
