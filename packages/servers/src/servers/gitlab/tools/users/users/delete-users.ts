import { defineTool } from '@usemcpkit/core';

export const usersUsersDeleteUsers = defineTool({
  name: 'users:users:delete_users',
  description: 'Delete a user. Deletes a user. Administrators only.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the user.',
      },
      hard_delete: {
        type: 'boolean',
        description:
          'If `true`, contributions that would usually be moved to a ghost user are deleted instead, along with groups owned solely by this user.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/users/{id}',
    query: ['hard_delete'],
  },
});
