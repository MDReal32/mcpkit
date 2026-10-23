import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensCreateGroupsAccessTokensRotate = defineTool({
  name: 'security:access_tokens:create_groups_access_tokens_rotate',
  description:
    'Rotate a group access token. Rotates a group access token. This immediately revokes the previous token and creates a token. Generally, this endpoint rotates a specific group access token by authenticating with a personal access token. You can also use a group access token to rotate itself. If you attempt to use this endpoint to rotate a token that was previously revoked, any active tokens from the same token family are revok…',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      token_id: {
        type: 'string',
        description: 'ID of the token.',
      },
      expires_at: {
        type: 'string',
        description:
          'Date when the access token expires. If omitted, the new token expires one week after rotation when token expiry is enforced, and does not expire otherwise.',
      },
    },
    required: ['id', 'token_id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/access_tokens/{token_id}/rotate',
    body: ['expires_at'],
  },
});
