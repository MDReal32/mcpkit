import { defineTool } from '@usemcpkit/core';

export const datacenterUserDeleteGroup = defineTool({
  name: 'datacenter:user:delete_group',
  description:
    '[Data Center] Delete user group. Removes the given User identified by username from the given Group identified by groupName.',
  input: {
    type: 'object',
    properties: {
      groupName: {
        type: 'string',
        description: 'The group name identifying the given group.',
      },
      username: {
        type: 'string',
        description: 'The username identifying the given user.',
      },
    },
    required: ['groupName', 'username'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/user/{username}/group/{groupName}',
  },
});
