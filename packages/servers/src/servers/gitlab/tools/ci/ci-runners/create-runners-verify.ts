import { defineTool } from '@usemcpkit/core';

export const ciCiRunnersCreateRunnersVerify = defineTool({
  name: 'ci:ci_runners:create_runners_verify',
  description: 'Verify authentication for a registered runner. Verifies authentication for a registered runner.',
  input: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'Authentication token of the runner.',
      },
      system_id: {
        type: 'string',
        description: 'System identifier of the runner. Must be provided if `token` starts with `glrt-`.',
      },
    },
    required: ['token'],
  },
  request: {
    method: 'POST',
    path: '/runners/verify',
    body: ['token', 'system_id'],
  },
});
