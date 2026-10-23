import { defineTool } from '@usemcpkit/core';

export const projectsProjectRolesGetProjectRoleById = defineTool({
  name: 'projects:project_roles:get_project_role_by_id',
  description:
    'Get project role by ID. Gets the project role details and the default actors associated with the role. The list of default actors is sorted by display name.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the project role. Use Get all project roles to get a list of project role IDs.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/role/{id}',
  },
});
