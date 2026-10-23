import { defineTool } from '@usemcpkit/core';

export const ciCiRunnersCreateRunnersResetAuthenticationToken = defineTool({
  name: 'ci:ci_runners:create_runners_reset_authentication_token',
  description:
    'Reset a runner authentication token with the current token. Resets a runner authentication token with the token used to authenticate the request.',
  input: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'Authentication token of the runner.',
      },
    },
    required: ['token'],
  },
  request: {
    method: 'POST',
    path: '/runners/reset_authentication_token',
    body: ['token'],
  },
});
