import { defineTool } from '@usemcpkit/core';

export const projectsBadgesGetGroupsBadges = defineTool({
  name: 'projects:badges:get_groups_badges',
  description: 'Retrieve a badge for a group. Retrieves a specified badge for a group.',
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
    method: 'GET',
    path: '/groups/{id}/badges/{badge_id}',
  },
});
