import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetLabelsRecent = defineTool({
  name: 'datacenter:space:get_labels_recent',
  description:
    '[Data Center] Get recent labels. Returns a paginated list of the most recent Labels used by Content within the given Space.This includes Labels used by Pages, Blog Posts, and other Content types.',
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
    path: '/rest/api/space/{spaceKey}/labels/recent',
    query: ['limit', 'start'],
  },
});
