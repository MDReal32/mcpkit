import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensCreateGroupsServiceAccountsPersonalAccessTokens = defineTool({
  name: 'security:access_tokens:create_groups_service_accounts_personal_access_tokens',
  description:
    'Create a personal access token for a group service account. Creates a personal access token for a specified group service account. Available only for group Owners and administrators. This feature was introduced in GitLab 16.1.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      user_id: {
        type: 'integer',
        description: 'ID of the service account.',
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
          'Expiration date of the access token in ISO format (YYYY-MM-DD). If undefined, the date is set to the maximum allowable lifetime limit.',
      },
      scopes: {
        type: 'array',
        description: 'Array of approved scopes. For a list of possible values, see access token scopes.',
        items: {
          type: 'string',
          enum: [
            'api',
            'read_api',
            'read_user',
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
            'sudo',
            'admin_mode',
            'read_service_ping',
          ],
        },
      },
    },
    required: ['id', 'user_id', 'name', 'scopes'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/service_accounts/{user_id}/personal_access_tokens',
    body: ['name', 'description', 'expires_at', 'scopes'],
  },
});
