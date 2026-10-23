import { defineTool } from '@usemcpkit/core';

export const projectsKeysCreateUsersKeys = defineTool({
  name: 'projects:keys:create_users_keys',
  description: 'Add an SSH key for a user. Adds an SSH key for a specified user account. Administrators only.',
  input: {
    type: 'object',
    properties: {
      user_id: {
        type: 'integer',
        description: 'ID of the user.',
      },
      key: {
        type: 'string',
        description: 'Public key value of the SSH key.',
      },
      title: {
        type: 'string',
        description: 'Title of the SSH key.',
      },
      expires_at: {
        type: 'string',
        description: 'Date when the SSH key expires.',
      },
      usage_type: {
        type: 'string',
        description: 'Usage scope for the key.',
        default: 'auth_and_signing',
        enum: ['auth_and_signing', 'auth', 'signing'],
      },
    },
    required: ['user_id', 'key', 'title'],
  },
  request: {
    method: 'POST',
    path: '/users/{user_id}/keys',
    body: ['key', 'title', 'expires_at', 'usage_type'],
  },
});
