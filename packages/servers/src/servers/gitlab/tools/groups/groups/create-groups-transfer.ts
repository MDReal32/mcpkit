import { defineTool } from '@usemcpkit/core';

export const groupsGroupsCreateGroupsTransfer = defineTool({
  name: 'groups:groups:create_groups_transfer',
  description:
    'Transfer a group. Transfers a group to another parent group or transforms a subgroup into a top-level group. You must be an administrator or have the Owner role for the group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      group_id: {
        type: 'integer',
        description: 'ID of the new parent group. If omitted, the group becomes a top-level group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/transfer',
    body: ['group_id'],
  },
});
