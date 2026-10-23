import { defineTool } from '@usemcpkit/core';

export const usersPermissionSchemesGetPermissionScheme = defineTool({
  name: 'users:permission_schemes:get_permission_scheme',
  description: 'Get permission scheme. Returns a permission scheme.',
  input: {
    type: 'object',
    properties: {
      schemeId: {
        type: 'integer',
        description: 'The ID of the permission scheme to return.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:',
      },
    },
    required: ['schemeId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/permissionscheme/{schemeId}',
    query: ['expand'],
  },
});
