import { defineTool } from '@usemcpkit/core';

export const usersGroupsGetUsersFromGroup = defineTool({
  name: 'users:groups:get_users_from_group',
  description: 'Get users from group. Returns a paginated list of all users in a group.',
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
      includeInactiveUsers: {
        type: 'boolean',
        default: false,
        description: 'Include inactive users.',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return per page (number should be between 1 and 50).',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/group/member',
    query: ['groupname', 'groupId', 'includeInactiveUsers', 'startAt', 'maxResults'],
  },
});
