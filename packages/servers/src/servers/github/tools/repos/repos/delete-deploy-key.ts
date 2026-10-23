import { defineTool } from '@usemcpkit/core';

export const reposReposDeleteDeployKey = defineTool({
  name: 'repos:repos:delete_deploy_key',
  description:
    'Delete a deploy key. Deploy keys are immutable. If you need to update a key, remove the key and create a new one instead.',
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
      key_id: {
        type: 'integer',
        description: 'The unique identifier of the key.',
      },
    },
    required: ['owner', 'repo', 'key_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/keys/{key_id}',
  },
});
