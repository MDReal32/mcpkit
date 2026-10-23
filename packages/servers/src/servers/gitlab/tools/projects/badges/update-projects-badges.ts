import { defineTool } from '@usemcpkit/core';

export const projectsBadgesUpdateProjectsBadges = defineTool({
  name: 'projects:badges:update_projects_badges',
  description: 'Update a badge for a project. Updates a specified badge for a project.',
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
      link_url: {
        type: 'string',
        description: 'URL of the badge link.',
      },
      image_url: {
        type: 'string',
        description: 'URL of the badge image.',
      },
      name: {
        type: 'string',
        description: 'Name of the badge.',
      },
    },
    required: ['id', 'badge_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/badges/{badge_id}',
    body: ['link_url', 'image_url', 'name'],
  },
});
