import { defineTool } from '@usemcpkit/core';

export const groupsEnterpriseUsersUpdateGroupsEnterpriseUsersDisableTwoFactor = defineTool({
  name: 'groups:enterprise_users:update_groups_enterprise_users_disable_two_factor',
  description:
    'Disable two-factor authentication for an enterprise user. Disables two-factor authentication (2FA) for a specified enterprise user.',
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
    },
    required: ['id', 'user_id'],
  },
  request: {
    method: 'PATCH',
    path: '/groups/{id}/enterprise_users/{user_id}/disable_two_factor',
  },
});
