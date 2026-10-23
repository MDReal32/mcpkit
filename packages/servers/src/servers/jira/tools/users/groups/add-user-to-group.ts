import { defineTool } from '@usemcpkit/core';

export const usersGroupsAddUserToGroup = defineTool({
  name: 'users:groups:add_user_to_group',
  description: 'Add user to group. Adds a user to a group.',
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
      accountId: {
        type: 'string',
        description:
          'The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.',
      },
      name: {
        type: 'string',
        description: 'This property is no longer available. See the deprecation notice for details.',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/group/user',
    query: ['groupname', 'groupId'],
    body: ['accountId', 'name'],
  },
});
