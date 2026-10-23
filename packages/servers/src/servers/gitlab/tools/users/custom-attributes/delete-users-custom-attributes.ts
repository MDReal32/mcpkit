import { defineTool } from '@usemcpkit/core';

export const usersCustomAttributesDeleteUsersCustomAttributes = defineTool({
  name: 'users:custom_attributes:delete_users_custom_attributes',
  description: 'Delete a custom attribute for a user. Deletes a specified custom attribute for a user.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'Key of the custom attribute.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the user.',
      },
    },
    required: ['key', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/users/{id}/custom_attributes/{key}',
  },
});
