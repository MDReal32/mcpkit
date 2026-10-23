import { defineTool } from '@usemcpkit/core';

export const cloudV1SpaceGetWatchersForSpace = defineTool({
  name: 'cloud_v1:space:get_watchers_for_space',
  description: '[Cloud v1] Get space watchers. Returns a list of watchers of a space',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'The key of the space to get watchers.',
      },
      start: {
        type: 'string',
        description: 'The start point of the collection to return.',
      },
      limit: {
        type: 'string',
        description: 'The limit of the number of items to return, this may be restricted by fixed system limits.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/space/{spaceKey}/watch',
    query: ['start', 'limit'],
  },
});
