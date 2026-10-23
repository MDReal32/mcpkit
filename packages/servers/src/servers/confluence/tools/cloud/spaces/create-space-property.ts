import { defineTool } from '@usemcpkit/core';

export const cloudSpacesCreateSpaceProperty = defineTool({
  name: 'cloud:spaces:create_space_property',
  description: '[Cloud] Create space property in space. Creates a new space property.',
  input: {
    type: 'object',
    properties: {
      space_id: {
        type: 'integer',
        description: 'The ID of the space for which space properties should be returned.',
      },
      key: {
        type: 'string',
        description: 'Key of the space property',
      },
      value: {
        description: 'Value of the space property.',
      },
    },
    required: ['space_id'],
  },
  request: {
    method: 'POST',
    path: '/wiki/api/v2/spaces/{space_id}/properties',
    body: ['key', 'value'],
  },
});
