import { defineTool } from '@usemcpkit/core';

export const projectsBadgesCreateProjectsBadges = defineTool({
  name: 'projects:badges:create_projects_badges',
  description: 'Create a badge for a project. Creates a badge for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    required: ['id', 'link_url', 'image_url'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/badges',
    body: ['link_url', 'image_url', 'name'],
  },
});
