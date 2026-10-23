import { defineTool } from '@usemcpkit/core';

export const actionsActionsDeleteRepoVariable = defineTool({
  name: 'actions:actions:delete_repo_variable',
  description: 'Delete a repository variable. Deletes a repository variable using the variable name.',
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
    },
    required: ['owner', 'repo', 'name'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/actions/variables/{name}',
  },
});
