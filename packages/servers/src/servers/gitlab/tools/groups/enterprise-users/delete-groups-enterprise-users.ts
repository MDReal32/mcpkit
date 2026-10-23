import { defineTool } from '@usemcpkit/core';

export const groupsEnterpriseUsersDeleteGroupsEnterpriseUsers = defineTool({
  name: 'groups:enterprise_users:delete_groups_enterprise_users',
  description: 'Delete an enterprise user. Deletes a specified enterprise user.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      user_id: {
        type: 'integer',
        description: 'ID of the user.',
      },
      hard_delete: {
        type: 'boolean',
        default: false,
        description:
          'If `true`, deletes the user, their associated contributions, and any groups owned solely by the user. If `false`, deletes the user and moves their contributions to a ghost user.',
      },
    },
    required: ['id', 'user_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/enterprise_users/{user_id}',
    query: ['hard_delete'],
  },
});
