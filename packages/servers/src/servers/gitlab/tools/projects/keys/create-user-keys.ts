import { defineTool } from '@usemcpkit/core';

export const projectsKeysCreateUserKeys = defineTool({
  name: 'projects:keys:create_user_keys',
  description: 'Add an SSH key. Adds an SSH key for the currently authenticated user.',
  input: {
    type: 'object',
    properties: {
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
    required: ['key', 'title'],
  },
  request: {
    method: 'POST',
    path: '/user/keys',
    body: ['key', 'title', 'expires_at', 'usage_type'],
  },
});
