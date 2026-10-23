import { defineTool } from '@usemcpkit/core';

export const groupsGroupsListGroupsProvisionedUsers = defineTool({
  name: 'groups:groups:list_groups_provisioned_users',
  description: 'List all provisioned users. Lists all provisioned users for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      username: {
        type: 'string',
        description: 'Return a user with the given username.',
      },
      search: {
        type: 'string',
        description: 'Search users by name, email, or username.',
      },
      active: {
        type: 'boolean',
        default: false,
        description: 'If `true`, returns only active users.',
      },
      blocked: {
        type: 'boolean',
        default: false,
        description: 'If `true`, returns only blocked users.',
      },
      created_after: {
        type: 'string',
        description: 'Return users created on or after the specified time.',
      },
      created_before: {
        type: 'string',
        description: 'Return users created on or before the specified time.',
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
    path: '/groups/{id}/provisioned_users',
    query: ['username', 'search', 'active', 'blocked', 'created_after', 'created_before', 'page', 'per_page'],
  },
});
