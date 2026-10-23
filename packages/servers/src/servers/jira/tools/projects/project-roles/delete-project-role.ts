import { defineTool } from '@usemcpkit/core';

export const projectsProjectRolesDeleteProjectRole = defineTool({
  name: 'projects:project_roles:delete_project_role',
  description:
    'Delete project role. Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in use.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description:
          'The ID of the project role to delete. Use Get all project roles to get a list of project role IDs.',
      },
      swap: {
        type: 'integer',
        description:
          'The ID of the project role that will replace the one being deleted. The swap will attempt to swap the role in schemes (notifications, permissions, issue security), workflows, worklogs and comments.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/role/{id}',
    query: ['swap'],
  },
});
