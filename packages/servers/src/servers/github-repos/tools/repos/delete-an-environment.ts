import { defineTool } from '@usemcpkit/core';

export const reposDeleteAnEnvironment = defineTool({
  name: 'repos:delete_an_environment',
  description:
    'Delete an environment. OAuth app tokens and personal access tokens (classic) need the `repo` scope to use this endpoint.',
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
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/environments/{environment_name}',
  },
});
