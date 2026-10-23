import { defineTool } from '@usemcpkit/core';

export const agentsUpdateRepoVariable = defineTool({
  name: 'agents:update_repo_variable',
  description:
    'Update a repository variable. Updates a repository variable that you can reference in a GitHub Actions workflow.',
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
      name: {
        type: 'string',
        description: 'The name of the variable.',
      },
      body_name: {
        type: 'string',
        description: 'The name of the variable.',
      },
      value: {
        type: 'string',
        description: 'The value of the variable.',
      },
    },
    required: ['owner', 'repo', 'name'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/agents/variables/{name}',
    body: {
      name: 'body_name',
      value: 'value',
    },
  },
});
