import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensDeletePersonalAccessTokensSelf = defineTool({
  name: 'security:access_tokens:delete_personal_access_tokens_self',
  description: 'Revoke a personal access token. Revokes a personal access token by passing it to the API in a header.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'DELETE',
    path: '/personal_access_tokens/self',
  },
});
