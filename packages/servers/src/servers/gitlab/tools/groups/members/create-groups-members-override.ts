import { defineTool } from '@usemcpkit/core';

export const groupsMembersCreateGroupsMembersOverride = defineTool({
  name: 'groups:members:create_groups_members_override',
  description:
    'Set override flag for a member of a group. Sets the override flag for a member of a group. By default, the access level of LDAP group members is set to the value specified by LDAP through Group Sync.',
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
    method: 'POST',
    path: '/groups/{id}/members/{user_id}/override',
  },
});
