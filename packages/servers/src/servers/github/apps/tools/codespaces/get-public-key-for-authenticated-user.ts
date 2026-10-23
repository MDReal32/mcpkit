import { defineTool } from '@usemcpkit/core';

export const codespacesGetPublicKeyForAuthenticatedUser = defineTool({
  name: 'codespaces:get_public_key_for_authenticated_user',
  description:
    'Get public key for the authenticated user. Gets your public key, which you need to encrypt secrets. You need to encrypt a secret before you can create or update secrets.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/user/codespaces/secrets/public-key',
  },
});
