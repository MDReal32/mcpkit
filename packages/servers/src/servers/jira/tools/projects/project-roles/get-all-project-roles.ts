import { defineTool } from '@usemcpkit/core';

export const projectsProjectRolesGetAllProjectRoles = defineTool({
  name: 'projects:project_roles:get_all_project_roles',
  description:
    'Get all project roles. Gets a list of all project roles, complete with project role details and default actors.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/role',
  },
});
