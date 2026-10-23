import { defineTool } from '@usemcpkit/core';

export const cloudSpacePermissionsBulkAssignSpacePermissionRoles = defineTool({
  name: 'cloud:space_permissions:bulk_assign_space_permission_roles',
  description:
    '[Cloud] Bulk assign space permission roles. Bulk assigns roles for one or more permission combination IDs obtained from the space permission combinations. Supports targeting all spaces, specific spaces, or excluding specific spaces.',
  input: {
    type: 'object',
    properties: {
      assignments: {
        type: 'array',
        description: 'List of role assignments to apply.',
        items: {
          type: 'object',
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
    required: ['assignments', 'spaceSelection'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/space-permissions/transition/role-assignments',
    body: ['assignments', 'spaceSelection'],
  },
});
