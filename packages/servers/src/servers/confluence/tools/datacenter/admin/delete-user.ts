import { defineTool } from '@usemcpkit/core';

export const datacenterAdminDeleteUser = defineTool({
  name: 'datacenter:admin:delete_user',
  description:
    '[Data Center] Delete user. Deletes the given User identified by username. This action is processed asynchronously.',
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
    method: 'DELETE',
    path: '/rest/api/admin/user/{username}',
  },
});
