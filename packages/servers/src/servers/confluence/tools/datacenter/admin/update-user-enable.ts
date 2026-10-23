import { defineTool } from '@usemcpkit/core';

export const datacenterAdminUpdateUserEnable = defineTool({
  name: 'datacenter:admin:update_user_enable',
  description:
    '[Data Center] Enable user. Enables the given User identified by username. This method is idempotent i.e. if the user is already enabled then no action will be taken.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'the username identifying the given user',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/admin/user/{username}/enable',
  },
});
