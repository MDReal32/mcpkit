import { defineTool } from '@usemcpkit/core';

export const projectsKeysCreateUserGpgKeysRevoke = defineTool({
  name: 'projects:keys:create_user_gpg_keys_revoke',
  description: 'Revoke a GPG key. This feature was added in GitLab 10.0',
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
    method: 'POST',
    path: '/user/gpg_keys/{key_id}/revoke',
  },
});
