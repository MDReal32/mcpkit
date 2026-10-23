import { defineTool } from '@usemcpkit/core';

export const projectsProjectRolesCreateProjectRole = defineTool({
  name: 'projects:project_roles:create_project_role',
  description:
    'Create project role. Creates a new project role with no default actors. You can use the Add default actors to project role operation to add default actors to the project role after creating it.',
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description:
          'A description of the project role. Required when fully updating a project role. Optional when creating or partially updating a project role.',
      },
      name: {
        type: 'string',
        description:
          'The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255 characters. Required when creating a project role. Optional when partially updating a project role.',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/role',
    body: ['description', 'name'],
  },
});
