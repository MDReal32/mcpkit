import { defineTool } from '@usemcpkit/core';

export const usersGetPublicSshKeyForAuthenticatedUser = defineTool({
  name: 'users:get_public_ssh_key_for_authenticated_user',
  description: 'Get a public SSH key for the authenticated user. View extended details for a single public SSH key.',
  input: {
    type: 'object',
    properties: {
      key_id: {
        type: 'integer',
        description: 'The unique identifier of the key.',
      },
    },
    required: ['key_id'],
  },
  request: {
    method: 'GET',
    path: '/user/keys/{key_id}',
  },
});
