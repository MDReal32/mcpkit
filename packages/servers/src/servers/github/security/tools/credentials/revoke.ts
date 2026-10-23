import { defineTool } from '@usemcpkit/core';

export const credentialsRevoke = defineTool({
  name: 'credentials:revoke',
  description:
    'Revoke a list of credentials. Submit a list of credentials to be revoked. This endpoint is intended to revoke credentials the caller does not own and may have found exposed on GitHub.com or elsewhere. It can also be used for credentials associated with an old user account that you no longer have access to. Credential owners will be notified of the revocation.',
  input: {
    type: 'object',
    properties: {
      credentials: {
        type: 'array',
        description: 'A list of credentials to be revoked, up to 1000 per request.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['credentials'],
  },
  request: {
    method: 'POST',
    path: '/credentials/revoke',
    body: ['credentials'],
  },
});
