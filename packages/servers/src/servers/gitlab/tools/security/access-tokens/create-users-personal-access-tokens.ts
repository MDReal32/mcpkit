import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensCreateUsersPersonalAccessTokens = defineTool({
  name: 'security:access_tokens:create_users_personal_access_tokens',
  description:
    'Create a personal access token for a user. Creates a personal access token for a user. To create a fine-grained personal access token, use `granular_scopes` instead of `scopes`. Token values are included with the response, but cannot be retrieved later. Administrators only.',
  input: {
    type: 'object',
    properties: {
      user_id: {
        type: 'integer',
        description: 'ID of the user.',
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
        description:
          'Array of approved scopes. For a list of possible values, see access token scopes. Exactly one of `scopes`, `granular_scopes` must be provided.',
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
      granular_scopes: {
        type: 'array',
        description: 'List of granular scopes to assign. Exactly one of `scopes`, `granular_scopes` must be provided.',
        items: {
          type: 'object',
          properties: {
            access: {
              type: 'string',
              description: 'Access to configure for the granular scope.',
              enum: ['personal_projects', 'all_memberships', 'selected_memberships', 'user', 'instance'],
            },
            permissions: {
              type: 'array',
              description: 'List of permissions for the granular scope.',
              items: {
                type: 'string',
              },
            },
            project_ids: {
              type: 'array',
              description:
                'IDs of projects to associate with the granular scope, when access is `selected_memberships`.',
              items: {
                type: 'integer',
              },
            },
            group_ids: {
              type: 'array',
              description: 'IDs of groups to associate with the granular scope, when access is `selected_memberships`.',
              items: {
                type: 'integer',
              },
            },
          },
          required: ['access', 'permissions'],
        },
      },
    },
    required: ['user_id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/users/{user_id}/personal_access_tokens',
    body: ['name', 'description', 'expires_at', 'scopes', 'granular_scopes'],
  },
});
