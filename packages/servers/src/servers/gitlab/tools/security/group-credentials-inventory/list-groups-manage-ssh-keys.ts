import { defineTool } from '@usemcpkit/core';

export const securityGroupCredentialsInventoryListGroupsManageSshKeys = defineTool({
  name: 'security:group_credentials_inventory:list_groups_manage_ssh_keys',
  description:
    'List all SSH keys for a group. Lists all SSH public keys associated with enterprise users in a top-level-group. This feature was introduced in GitLab 17.9.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      created_before: {
        type: 'string',
        description: 'Return SSH keys created on or before the specified time.',
      },
      created_after: {
        type: 'string',
        description: 'Return SSH keys created on or after the specified time.',
      },
      expires_before: {
        type: 'string',
        description: 'Return SSH keys that expire on or before the specified time.',
      },
      expires_after: {
        type: 'string',
        description: 'Return SSH keys that expire on or after the specified time.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/manage/ssh_keys',
    query: ['created_before', 'created_after', 'expires_before', 'expires_after', 'page', 'per_page'],
  },
});
