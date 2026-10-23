import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetLabelsPopular = defineTool({
  name: 'datacenter:space:get_labels_popular',
  description:
    '[Data Center] Get popular labels. Returns a paginated list of all Labels used by Content within the given Space.This includes Labels used by Pages, Blog Posts, and other Content types.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'a string containing the key of the space',
      },
      limit: {
        type: 'integer',
        description: 'the limit of the number of labels to return, this may be restricted by fixed system limits',
      },
      start: {
        type: 'integer',
        description: 'the start point of the collection to return.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/space/{spaceKey}/labels/popular',
    query: ['limit', 'start'],
  },
});
