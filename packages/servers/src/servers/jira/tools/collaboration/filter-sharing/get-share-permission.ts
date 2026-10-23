import { defineTool } from '@usemcpkit/core';

export const collaborationFilterSharingGetSharePermission = defineTool({
  name: 'collaboration:filter_sharing:get_share_permission',
  description:
    'Get share permission. Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.',
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
    method: 'GET',
    path: '/rest/api/2/filter/{id}/permission/{permissionId}',
  },
});
