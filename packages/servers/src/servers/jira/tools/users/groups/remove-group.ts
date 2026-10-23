import { defineTool } from '@usemcpkit/core';

export const usersGroupsRemoveGroup = defineTool({
  name: 'users:groups:remove_group',
  description: 'Remove group. Deletes a group.',
  input: {
    type: 'object',
    properties: {
      groupname: {
        type: 'string',
      },
      groupId: {
        type: 'string',
        description: 'The ID of the group. This parameter cannot be used with the `groupname` parameter.',
      },
      swapGroup: {
        type: 'string',
        description:
          "As a group's name can change, use of `swapGroupId` is recommended to identify a group. The group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroupId` parameter.",
      },
      swapGroupId: {
        type: 'string',
        description:
          'The ID of the group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroup` parameter.',
      },
    },
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/group',
    query: ['groupname', 'groupId', 'swapGroup', 'swapGroupId'],
  },
});
