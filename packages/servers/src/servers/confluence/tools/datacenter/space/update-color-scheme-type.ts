import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceUpdateColorSchemeType = defineTool({
  name: 'datacenter:space:update_color_scheme_type',
  description:
    '[Data Center] Update Space color scheme type. Update the color scheme type used for a space, currently it can be global or custom',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'space key of the space to update color scheme type for.',
      },
      type: {
        type: 'string',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/space/{spaceKey}/color-scheme/type',
    body: ['type'],
  },
});
