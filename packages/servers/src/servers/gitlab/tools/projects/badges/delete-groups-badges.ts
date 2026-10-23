import { defineTool } from '@usemcpkit/core';

export const projectsBadgesDeleteGroupsBadges = defineTool({
  name: 'projects:badges:delete_groups_badges',
  description: 'Delete a badge from a group. Deletes a specified badge from a group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      badge_id: {
        type: 'integer',
        description: 'ID of the badge.',
      },
    },
    required: ['id', 'badge_id'],
  },
  request: {
    method: 'DELETE',
    path: '/groups/{id}/badges/{badge_id}',
  },
});
