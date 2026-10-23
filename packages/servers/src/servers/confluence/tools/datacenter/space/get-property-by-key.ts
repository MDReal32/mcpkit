import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetPropertyByKey = defineTool({
  name: 'datacenter:space:get_property_by_key',
  description: '[Data Center] Get space property by key. Returns a space property.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'the space to find properties under. Required.',
      },
      key: {
        type: 'string',
      },
      expand: {
        type: 'string',
        description:
          'a comma separated list of properties to expand on the space properties. Default value: <code>version</code>.',
      },
      limit: {
        type: 'string',
        description: 'the limit of the number of items to return, this may be restricted by fixed system limits.',
      },
      start: {
        type: 'string',
        description: 'he start point of the collection to return.',
      },
    },
    required: ['spaceKey', 'key'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/space/{spaceKey}/property/{key}',
    query: ['expand', 'limit', 'start'],
  },
});
