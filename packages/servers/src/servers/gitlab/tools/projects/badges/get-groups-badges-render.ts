import { defineTool } from '@usemcpkit/core';

export const projectsBadgesGetGroupsBadgesRender = defineTool({
  name: 'projects:badges:get_groups_badges_render',
  description:
    'Retrieve a badge preview for a group. Previews the final `link_url` and `image_url` for a specified group after resolving the placeholder interpolation.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      link_url: {
        type: 'string',
        description: 'URL of the badge link.',
      },
      image_url: {
        type: 'string',
        description: 'URL of the badge image.',
      },
    },
    required: ['id', 'link_url', 'image_url'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/badges/render',
    query: ['link_url', 'image_url'],
  },
});
