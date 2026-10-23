import { defineTool } from '@usemcpkit/core';

export const groupsMembersDeleteGroupsMembersOverride = defineTool({
  name: 'groups:members:delete_groups_members_override',
  description: 'Remove an LDAP access level override. Removes an LDAP access level override for a member of a group.',
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
    },
    required: ['id', 'user_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/members/{user_id}/override',
  },
});
