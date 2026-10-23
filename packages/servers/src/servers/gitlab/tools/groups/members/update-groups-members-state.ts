import { defineTool } from '@usemcpkit/core';

export const groupsMembersUpdateGroupsMembersState = defineTool({
  name: 'groups:members:update_groups_members_state',
  description:
    'Update group membership state for a user. Updates the membership state for a specified user in a group.',
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
      state: {
        type: 'string',
        description: 'New state for the member.',
        enum: ['awaiting', 'active'],
      },
    },
    required: ['id', 'user_id', 'state'],
  },
  request: {
    method: 'PUT',
    path: '/groups/{id}/members/{user_id}/state',
    body: ['state'],
  },
});
