import { defineTool } from '@usemcpkit/core';

export const actionsActionsCreateEnvironmentVariable = defineTool({
  name: 'actions:actions:create_environment_variable',
  description:
    'Create an environment variable. Create an environment variable that you can reference in a GitHub Actions workflow.',
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
      name: {
        type: 'string',
        description: 'The name of the variable.',
      },
      value: {
        type: 'string',
        description: 'The value of the variable.',
      },
    },
    required: ['owner', 'repo', 'environment_name', 'name', 'value'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/environments/{environment_name}/variables',
    body: ['name', 'value'],
  },
});
