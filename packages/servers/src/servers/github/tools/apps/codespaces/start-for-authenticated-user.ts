import { defineTool } from '@usemcpkit/core';

export const appsCodespacesStartForAuthenticatedUser = defineTool({
  name: 'apps:codespaces:start_for_authenticated_user',
  description: "Start a codespace for the authenticated user. Starts a user's codespace.",
  input: {
    type: 'object',
    properties: {
      codespace_name: {
        type: 'string',
        description: 'The name of the codespace.',
      },
    },
    required: ['codespace_name'],
  },
  request: {
    method: 'POST',
    path: '/user/codespaces/{codespace_name}/start',
  },
});
