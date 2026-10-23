import { defineTool } from '@usemcpkit/core';

export const projectsKeysCreateUsersGpgKeys = defineTool({
  name: 'projects:keys:create_users_gpg_keys',
  description: 'Add a GPG key for a user. Adds a GPG key for a specified user account. Administrators only.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the user.',
      },
      key: {
        type: 'string',
        description: 'Public key value of the GPG key.',
      },
    },
    required: ['id', 'key'],
  },
  request: {
    method: 'POST',
    path: '/users/{id}/gpg_keys',
    body: ['key'],
  },
});
