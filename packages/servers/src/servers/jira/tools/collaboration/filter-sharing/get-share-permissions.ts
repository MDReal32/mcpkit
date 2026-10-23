import { defineTool } from '@usemcpkit/core';

export const collaborationFilterSharingGetSharePermissions = defineTool({
  name: 'collaboration:filter_sharing:get_share_permissions',
  description:
    'Get share permissions. Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the filter.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/filter/{id}/permission',
  },
});
