import { defineTool } from '@usemcpkit/core';

export const usersGroupsRemoveUserFromGroup = defineTool({
  name: 'users:groups:remove_user_from_group',
  description: 'Remove user from group. Removes a user from a group.',
  input: {
    type: 'object',
    properties: {
      groupname: {
        type: 'string',
        description:
          "As a group's name can change, use of `groupId` is recommended to identify a group. The name of the group. This parameter cannot be used with the `groupId` parameter.",
      },
      groupId: {
        type: 'string',
        description: 'The ID of the group. This parameter cannot be used with the `groupName` parameter.',
      },
      username: {
        type: 'string',
        description: 'This parameter is no longer available. See the deprecation notice for details.',
      },
      accountId: {
        type: 'string',
        description:
          'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.',
      },
    },
    required: ['accountId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/group/user',
    query: ['groupname', 'groupId', 'username', 'accountId'],
  },
});
