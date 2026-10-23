import { defineTool } from '@usemcpkit/core';

export const reposChecksCreateSuite = defineTool({
  name: 'repos:checks:create_suite',
  description:
    'Create a check suite. Creates a check suite manually. By default, check suites are automatically created when you create a check run. You only need to use this endpoint for manually creating check suites when you\'ve disabled automatic creation using "Update repository preferences for check suites".',
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
      head_sha: {
        type: 'string',
        description: 'The sha of the head commit.',
      },
    },
    required: ['owner', 'repo', 'head_sha'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/check-suites',
    body: ['head_sha'],
  },
});
