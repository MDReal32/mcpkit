import { defineTool } from '@usemcpkit/core';

export const groupsMembersCreateGroupsMembersApproveAll = defineTool({
  name: 'groups:members:create_groups_members_approve_all',
  description:
    'Approve all pending group members. Approves all pending users for a specified top-level group and any subgroups or projects.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/members/approve_all',
  },
});
