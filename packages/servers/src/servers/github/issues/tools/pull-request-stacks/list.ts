import { defineTool } from '@usemcpkit/core';

export const pullRequestStacksList = defineTool({
  name: 'pull_request_stacks:list',
  description: 'List pull request stacks. Lists pull request stacks in a repository.',
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
      pull_request: {
        type: 'integer',
        description: 'Filter to the stack containing this repository pull request number.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/stacks',
    query: ['pull_request', 'per_page', 'page'],
  },
});
