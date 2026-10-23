import { defineTool } from '@usemcpkit/core';

export const pullRequestStacksAdd = defineTool({
  name: 'pull_request_stacks:add',
  description:
    "Add pull requests to a pull request stack. Appends an ordered list of pull request numbers onto the top of an existing stack. Provide only the pull requests you want to add, from the current top of the stack upward. The first new pull request's base ref must match the current top pull request's head ref.",
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
      pull_requests: {
        type: 'array',
        description: 'An ordered list of pull request numbers to append to the stack, from the current top upward.',
        items: {
          type: 'integer',
        },
      },
    },
    required: ['owner', 'repo', 'stack_number', 'pull_requests'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/stacks/{stack_number}/add',
    body: ['pull_requests'],
  },
});
