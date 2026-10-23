import { defineTool } from '@usemcpkit/core';

export const groupsMemberRolesListAdminMemberRoles = defineTool({
  name: 'groups:member_roles:list_admin_member_roles',
  description:
    'Get Admin Roles for this GitLab instance. Retrieves all custom admin roles configured for the instance.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/admin_member_roles',
  },
});
