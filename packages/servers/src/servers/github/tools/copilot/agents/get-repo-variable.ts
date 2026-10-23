import { defineTool } from '@usemcpkit/core';

export const copilotAgentsGetRepoVariable = defineTool({
  name: 'copilot:agents:get_repo_variable',
  description: 'Get a repository variable. Gets a specific variable in a repository.',
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
    method: 'GET',
    path: '/repos/{owner}/{repo}/agents/variables/{name}',
  },
});
