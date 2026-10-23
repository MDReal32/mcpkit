import { defineTool } from '@usemcpkit/core';

export const projectsKeysGetUsersKeys = defineTool({
  name: 'projects:keys:get_users_keys',
  description:
    'Retrieve an SSH key for a user. Retrieves an SSH key for a specified user account. This endpoint does not require authentication.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the user.',
      },
      key_id: {
        type: 'integer',
        description: 'ID of the SSH key.',
      },
    },
    required: ['id', 'key_id'],
  },
  request: {
    method: 'GET',
    path: '/users/{id}/keys/{key_id}',
  },
});
