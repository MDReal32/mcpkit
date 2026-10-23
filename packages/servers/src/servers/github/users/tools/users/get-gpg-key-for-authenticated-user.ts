import { defineTool } from '@usemcpkit/core';

export const usersGetGpgKeyForAuthenticatedUser = defineTool({
  name: 'users:get_gpg_key_for_authenticated_user',
  description: 'Get a GPG key for the authenticated user. View extended details for a single GPG key.',
  input: {
    type: 'object',
    properties: {
      gpg_key_id: {
        type: 'integer',
        description: 'The unique identifier of the GPG key.',
      },
    },
    required: ['gpg_key_id'],
  },
  request: {
    method: 'GET',
    path: '/user/gpg_keys/{gpg_key_id}',
  },
});
