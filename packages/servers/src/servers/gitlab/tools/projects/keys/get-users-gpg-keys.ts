import { defineTool } from '@usemcpkit/core';

export const projectsKeysGetUsersGpgKeys = defineTool({
  name: 'projects:keys:get_users_gpg_keys',
  description:
    'Retrieve a GPG key for a user. Retrieves a GPG key for a specified user account. This endpoint does not require authentication.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the user.',
      },
      key_id: {
        type: 'integer',
        description: 'ID of the GPG key.',
      },
    },
    required: ['id', 'key_id'],
  },
  request: {
    method: 'GET',
    path: '/users/{id}/gpg_keys/{key_id}',
  },
});
