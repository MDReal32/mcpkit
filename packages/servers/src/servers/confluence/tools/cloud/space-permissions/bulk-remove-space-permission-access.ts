import { defineTool } from '@usemcpkit/core';

export const cloudSpacePermissionsBulkRemoveSpacePermissionAccess = defineTool({
  name: 'cloud:space_permissions:bulk_remove_space_permission_access',
  description:
    '[Cloud] Bulk remove space permission access. Bulk removes access for one or more permission combination IDs obtained from the space permission combinations. This removes all space permissions for the specified combinations across the targeted spaces.',
  input: {
    type: 'object',
    properties: {
      permissionCombinationIds: {
        type: 'array',
        description: 'List of permission combination IDs to remove access for.',
        items: {
          type: 'string',
        },
      },
      spaceSelection: {
        type: 'object',
        properties: {
          spaceType: {
            type: 'string',
            description: 'The space selection type.',
            enum: ['ALL', 'ALL_EXCEPT_PERSONAL', 'ALL_EXCEPT_SPECIFIC', 'PERSONAL', 'SPECIFIC'],
          },
          selectedSpaces: {
            type: 'array',
            description: 'List of specific spaces. Required when spaceType is SPECIFIC or ALL_EXCEPT_SPECIFIC.',
            items: {
              type: 'object',
            },
          },
        },
        required: ['spaceType'],
      },
    },
    required: ['permissionCombinationIds', 'spaceSelection'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/space-permissions/transition/access-removals',
    body: ['permissionCombinationIds', 'spaceSelection'],
  },
});
