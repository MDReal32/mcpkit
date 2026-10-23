import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetColorSchemeType = defineTool({
  name: 'datacenter:space:get_color_scheme_type',
  description:
    '[Data Center] Get Space color scheme type. Get the current color scheme type used for a space, it can be global or custom',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'Space key of the space to request color scheme type for.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/space/{spaceKey}/color-scheme/type',
  },
});
