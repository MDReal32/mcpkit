import { defineTool } from '@usemcpkit/core';

export const groupsMemberRolesListMemberRoles = defineTool({
  name: 'groups:member_roles:list_member_roles',
  description: 'List all instance member roles. Lists all member roles for this GitLab instance.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/member_roles',
  },
});
