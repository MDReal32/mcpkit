import { defineTool } from '@usemcpkit/core';

export const groupsMembersGetGroupsMembers = defineTool({
  name: 'groups:members:get_groups_members',
  description:
    'Retrieve a direct group member. Retrieves a specified member of a group. Returns only direct members and not inherited members through ancestor groups.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      user_id: {
        type: 'integer',
        description: 'User ID of the member.',
      },
    },
    required: ['id', 'user_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/members/{user_id}',
  },
});
