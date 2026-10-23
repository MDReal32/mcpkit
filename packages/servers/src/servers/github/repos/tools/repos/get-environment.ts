import { defineTool } from '@usemcpkit/core';

export const reposGetEnvironment = defineTool({
  name: 'repos:get_environment',
  description:
    'Get an environment. > [!NOTE] > To get information about name patterns that branches must match in order to deploy to this environment, see "Get a deployment branch policy."',
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
    path: '/repos/{owner}/{repo}/environments/{environment_name}',
  },
});
