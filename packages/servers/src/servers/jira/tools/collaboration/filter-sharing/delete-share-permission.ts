import { defineTool } from '@usemcpkit/core';

export const collaborationFilterSharingDeleteSharePermission = defineTool({
  name: 'collaboration:filter_sharing:delete_share_permission',
  description: 'Delete share permission. Deletes a share permission from a filter.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the filter.',
      },
      permissionId: {
        type: 'integer',
        description: 'The ID of the share permission.',
      },
    },
    required: ['id', 'permissionId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/filter/{id}/permission/{permissionId}',
  },
});
