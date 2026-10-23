import { defineTool } from '@usemcpkit/core';

export const usersPermissionSchemesDeletePermissionSchemeEntity = defineTool({
  name: 'users:permission_schemes:delete_permission_scheme_entity',
  description:
    'Delete permission scheme grant. Deletes a permission grant from a permission scheme. See About permission schemes and grants for more details.',
  input: {
    type: 'object',
    properties: {
      schemeId: {
        type: 'integer',
        description: 'The ID of the permission scheme to delete the permission grant from.',
      },
      permissionId: {
        type: 'integer',
        description: 'The ID of the permission grant to delete.',
      },
    },
    required: ['schemeId', 'permissionId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/permissionscheme/{schemeId}/permission/{permissionId}',
  },
});
