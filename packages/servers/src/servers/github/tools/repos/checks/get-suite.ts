import { defineTool } from '@usemcpkit/core';

export const reposChecksGetSuite = defineTool({
  name: 'repos:checks:get_suite',
  description: 'Get a check suite. Gets a single check suite using its `id`.',
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
      check_suite_id: {
        type: 'integer',
        description: 'The unique identifier of the check suite.',
      },
    },
    required: ['owner', 'repo', 'check_suite_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/check-suites/{check_suite_id}',
  },
});
