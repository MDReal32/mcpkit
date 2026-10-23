import { defineTool } from '@usemcpkit/core';

export const groupsMembersGetGroupsMembersAll = defineTool({
  name: 'groups:members:get_groups_members_all',
  description:
    'Retrieve a group member. Retrieves a specified member of a group. Returns direct members and members inherited or invited through ancestor groups.',
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
    path: '/groups/{id}/members/all/{user_id}',
  },
});
