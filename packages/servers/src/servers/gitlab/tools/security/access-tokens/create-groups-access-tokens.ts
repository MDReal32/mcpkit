import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensCreateGroupsAccessTokens = defineTool({
  name: 'security:access_tokens:create_groups_access_tokens',
  description:
    'Create a group access token. Creates a group access token for a specified group. You cannot create a token with an access level greater than your account. For example, a user with the Maintainer role cannot create a group access token with the Owner role. You must use a personal access token with this endpoint. You cannot authenticate with a group access token.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      name: {
        type: 'string',
        description: 'Name of the access token.',
      },
      description: {
        type: 'string',
        description: 'Description of the access token. Limited to 255 characters.',
      },
      expires_at: {
        type: 'string',
        description:
          'Date when the access token expires. If omitted, the token does not expire, which is accepted only when token expiry is not enforced.',
      },
      scopes: {
        type: 'array',
        description: 'List of scopes available to the token.',
        items: {
          type: 'string',
          enum: [
            'api',
            'read_api',
            'create_runner',
            'manage_runner',
            'k8s_proxy',
            'self_rotate',
            'mcp',
            'mcp_orbit',
            'granular',
            'read_repository',
            'write_repository',
            'read_virtual_registry',
            'write_virtual_registry',
            'read_observability',
            'write_observability',
            'ai_features',
          ],
        },
      },
      access_level: {
        type: 'integer',
        description: 'The access level of the token in the group',
        default: 40,
        enum: [10, 15, 20, 25, 30, 40, 50],
      },
    },
    required: ['id', 'name', 'scopes'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/access_tokens',
    body: ['name', 'description', 'expires_at', 'scopes', 'access_level'],
  },
});
