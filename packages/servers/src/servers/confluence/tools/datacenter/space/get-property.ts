import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetProperty = defineTool({
  name: 'datacenter:space:get_property',
  description: '[Data Center] Get space properties. Returns a paginated list of space properties.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'the space to find properties under. Required.',
      },
      expand: {
        type: 'string',
        description:
          'a comma separated list of properties to expand on the space properties. Default value: <code>version</code>.',
      },
      limit: {
        type: 'integer',
        description: 'the limit of the number of items to return, this may be restricted by fixed system limits.',
      },
      start: {
        type: 'integer',
        description: 'he start point of the collection to return.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/space/{spaceKey}/property',
    query: ['expand', 'limit', 'start'],
  },
});
