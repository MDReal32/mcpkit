import { defineTool } from '@usemcpkit/core';

export const groupsMemberRolesDeleteAdminMemberRoles = defineTool({
  name: 'groups:member_roles:delete_admin_member_roles',
  description: 'Delete Admin Role. Deletes a specific custom admin role by its ID.',
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
    path: '/admin_member_roles/{member_role_id}',
  },
});
