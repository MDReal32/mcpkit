import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetColorScheme = defineTool({
  name: 'datacenter:space:get_color_scheme',
  description: '[Data Center] Get Space color scheme. Get information about the current color scheme for a space',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'space key of the space to request color scheme for.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/space/{spaceKey}/color-scheme',
  },
});
