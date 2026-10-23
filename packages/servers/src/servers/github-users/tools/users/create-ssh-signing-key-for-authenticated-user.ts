import { defineTool } from '@usemcpkit/core';

export const usersCreateSshSigningKeyForAuthenticatedUser = defineTool({
  name: 'users:create_ssh_signing_key_for_authenticated_user',
  description:
    "Create a SSH signing key for the authenticated user. Creates an SSH signing key for the authenticated user's GitHub account.",
  input: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'A descriptive name for the new key.',
      },
      key: {
        type: 'string',
        description:
          'The public SSH key to add to your GitHub account. For more information, see "Checking for existing SSH keys."',
      },
    },
    required: ['key'],
  },
  request: {
    method: 'POST',
    path: '/user/ssh_signing_keys',
    body: ['title', 'key'],
  },
});
