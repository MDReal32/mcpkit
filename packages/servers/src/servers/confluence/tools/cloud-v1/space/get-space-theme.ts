import { defineTool } from '@usemcpkit/core';

export const cloudV1SpaceGetSpaceTheme = defineTool({
  name: 'cloud_v1:space:get_space_theme',
  description:
    '[Cloud v1] Get space theme. Returns the theme selected for a space, if one is set. If no space theme is set, this means that the space is inheriting the global look and feel settings.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'The key of the space to be queried for its theme.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/space/{spaceKey}/theme',
  },
});
