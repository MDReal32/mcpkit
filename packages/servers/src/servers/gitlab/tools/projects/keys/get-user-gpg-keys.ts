import { defineTool } from '@usemcpkit/core';

export const projectsKeysGetUserGpgKeys = defineTool({
  name: 'projects:keys:get_user_gpg_keys',
  description: 'Retrieve a GPG key. Retrieves a GPG key for the currently authenticated user.',
  input: {
    type: 'object',
    properties: {
      key_id: {
        type: 'integer',
        description: 'ID of the GPG key.',
      },
    },
    required: ['key_id'],
  },
  request: {
    method: 'GET',
    path: '/user/gpg_keys/{key_id}',
  },
});
