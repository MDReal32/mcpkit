import { defineTool } from '@usemcpkit/core';

export const usersPermissionSchemesGetAllPermissionSchemes = defineTool({
  name: 'users:permission_schemes:get_all_permission_schemes',
  description: 'Get all permission schemes. Returns all permission schemes.',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/permissionscheme',
    query: ['expand'],
  },
});
