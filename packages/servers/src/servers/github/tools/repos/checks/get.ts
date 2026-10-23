import { defineTool } from '@usemcpkit/core';

export const reposChecksGet = defineTool({
  name: 'repos:checks:get',
  description: 'Get a check run. Gets a single check run using its `id`.',
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
      check_run_id: {
        type: 'integer',
        description: 'The unique identifier of the check run.',
      },
    },
    required: ['owner', 'repo', 'check_run_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/check-runs/{check_run_id}',
  },
});
