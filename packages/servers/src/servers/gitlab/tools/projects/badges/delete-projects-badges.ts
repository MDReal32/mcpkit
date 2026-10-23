import { defineTool } from '@usemcpkit/core';

export const projectsBadgesDeleteProjectsBadges = defineTool({
  name: 'projects:badges:delete_projects_badges',
  description: 'Delete a badge from a project. Deletes a specified badge from a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    path: '/projects/{id}/badges/{badge_id}',
  },
});
