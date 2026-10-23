import { defineTool } from '@usemcpkit/core';

export const appsCodespacesGetForAuthenticatedUser = defineTool({
  name: 'apps:codespaces:get_for_authenticated_user',
  description: "Get a codespace for the authenticated user. Gets information about a user's codespace.",
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
    method: 'GET',
    path: '/user/codespaces/{codespace_name}',
  },
});
