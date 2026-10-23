import { defineTool } from '@usemcpkit/core';

export const cloudSpacesGetSpacePropertyById = defineTool({
  name: 'cloud:spaces:get_space_property_by_id',
  description: '[Cloud] Get space property by id. Retrieve a space property by its id.',
  input: {
    type: 'object',
    properties: {
      space_id: {
        type: 'integer',
        description: 'The ID of the space the property belongs to.',
      },
      property_id: {
        type: 'integer',
        description: 'The ID of the property to be retrieved.',
      },
    },
    required: ['space_id', 'property_id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/spaces/{space_id}/properties/{property_id}',
  },
});
