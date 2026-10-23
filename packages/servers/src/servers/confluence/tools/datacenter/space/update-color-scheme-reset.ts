import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceUpdateColorSchemeReset = defineTool({
  name: 'datacenter:space:update_color_scheme_reset',
  description: '[Data Center] Reset Space color scheme. Reset the space color scheme to use global color scheme',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'Space key of the space to reset color scheme for.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/space/{spaceKey}/color-scheme/reset',
  },
});
