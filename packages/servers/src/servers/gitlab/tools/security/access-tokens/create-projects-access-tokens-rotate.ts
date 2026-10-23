import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensCreateProjectsAccessTokensRotate = defineTool({
  name: 'security:access_tokens:create_projects_access_tokens_rotate',
  description:
    'Rotate a project access token. Rotates a project access token. This immediately revokes the previous token and creates a token. Generally, this endpoint rotates a specific project access token by authenticating with a personal access token. You can also use a project access token to rotate itself. If you attempt to use this endpoint to rotate a token that was previously revoked, any active tokens from the same token family are…',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    path: '/projects/{id}/access_tokens/{token_id}/rotate',
    body: ['expires_at'],
  },
});
