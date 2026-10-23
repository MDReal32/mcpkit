import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensCreateProjectsAccessTokensSelfRotate = defineTool({
  name: 'security:access_tokens:create_projects_access_tokens_self_rotate',
  description: 'Rotate a project access token. Rotates a project access token by passing it to the API in a header.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      expires_at: {
        type: 'string',
        description:
          'Date when the access token expires. If omitted, the new token expires one week after rotation when token expiry is enforced, and does not expire otherwise.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/access_tokens/self/rotate',
    body: ['expires_at'],
  },
});
