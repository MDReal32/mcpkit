import { defineTool } from '@usemcpkit/core';

export const usersPermissionsGetPermittedProjects = defineTool({
  name: 'users:permissions:get_permitted_projects',
  description:
    'Get permitted projects. Returns all the projects where the user is granted a list of project permissions.',
  input: {
    type: 'object',
    properties: {
      permissions: {
        type: 'array',
        description: 'A list of permission keys.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['permissions'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/permissions/project',
    body: ['permissions'],
  },
});
