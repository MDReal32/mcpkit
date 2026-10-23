import { defineTool } from '@usemcpkit/core';

export const projectsProjectPermissionSchemesGetAssignedPermissionScheme = defineTool({
  name: 'projects:project_permission_schemes:get_assigned_permission_scheme',
  description: 'Get assigned permission scheme. Gets the permission scheme associated with the project.',
  input: {
    type: 'object',
    properties: {
      projectKeyOrId: {
        type: 'string',
        description: 'The project ID or project key (case sensitive).',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:',
      },
    },
    required: ['projectKeyOrId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/project/{projectKeyOrId}/permissionscheme',
    query: ['expand'],
  },
});
