import { defineTool } from '@usemcpkit/core';

export const issuesPullRequestStacksGet = defineTool({
  name: 'issues:pull_request_stacks:get',
  description: 'Get a pull request stack. Gets a pull request stack by providing its stack number.',
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
      stack_number: {
        type: 'integer',
        description: 'The number that identifies the pull request stack.',
      },
    },
    required: ['owner', 'repo', 'stack_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/stacks/{stack_number}',
  },
});
