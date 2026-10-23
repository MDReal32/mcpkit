import { defineTool } from '@usemcpkit/core';

export const groupsMemberRolesDeleteMemberRoles = defineTool({
  name: 'groups:member_roles:delete_member_roles',
  description: 'Delete an instance member role. Deletes an instance member role.',
  input: {
    type: 'object',
    properties: {
      member_role_id: {
        type: 'integer',
        description: 'ID of the member role.',
      },
    },
    required: ['member_role_id'],
  },
  request: {
    method: 'DELETE',
    path: '/member_roles/{member_role_id}',
  },
});
