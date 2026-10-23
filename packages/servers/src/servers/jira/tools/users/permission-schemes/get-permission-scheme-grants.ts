import { defineTool } from '@usemcpkit/core';

export const usersPermissionSchemesGetPermissionSchemeGrants = defineTool({
  name: 'users:permission_schemes:get_permission_scheme_grants',
  description: 'Get permission scheme grants. Returns all permission grants for a permission scheme.',
  input: {
    type: 'object',
    properties: {
      schemeId: {
        type: 'integer',
        description: 'The ID of the permission scheme.',
      },
      expand: {
        type: 'string',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:',
      },
    },
    required: ['schemeId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/permissionscheme/{schemeId}/permission',
    query: ['expand'],
  },
});
