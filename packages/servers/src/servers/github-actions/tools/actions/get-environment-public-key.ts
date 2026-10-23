import { defineTool } from '@usemcpkit/core';

export const actionsGetEnvironmentPublicKey = defineTool({
  name: 'actions:get_environment_public_key',
  description:
    'Get an environment public key. Get the public key for an environment, which you need to encrypt environment secrets. You need to encrypt a secret before you can create or update secrets.',
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
      environment_name: {
        type: 'string',
        description:
          'The name of the environment. The name must be URL encoded. For example, any slashes in the name must be replaced with `%2F`.',
      },
    },
    required: ['owner', 'repo', 'environment_name'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key',
  },
});
