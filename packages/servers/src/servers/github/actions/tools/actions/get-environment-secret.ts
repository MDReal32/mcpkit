import { defineTool } from '@usemcpkit/core';

export const actionsGetEnvironmentSecret = defineTool({
  name: 'actions:get_environment_secret',
  description: 'Get an environment secret. Gets a single environment secret without revealing its encrypted value.',
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
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
    },
    required: ['owner', 'repo', 'environment_name', 'secret_name'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}',
  },
});
