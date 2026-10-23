import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceDeleteProperty = defineTool({
  name: 'datacenter:space:delete_property',
  description: '[Data Center] Delete space property. Deletes a space property.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'the key of the space.',
      },
      key: {
        type: 'string',
        description: 'the key of the property.',
      },
    },
    required: ['spaceKey', 'key'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/space/{spaceKey}/property/{key}',
  },
});
