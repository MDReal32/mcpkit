import { defineTool } from '@usemcpkit/core';

export const datacenterLabelGetPopular = defineTool({
  name: 'datacenter:label:get_popular',
  description:
    '[Data Center] Get most popular labels. Returns a paginated list of the most popular labels within a Confluence instance. This includes Labels used by Pages, Blog Posts, and other Content types. Labels are sorted based on number of occurrences from the most to the least used. Only global labels are considered in this list.',
  input: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        description: 'the limit of the number of labels to return, this may be restricted by fixed system limits',
      },
      start: {
        type: 'integer',
        description: 'the start point of the collection to return.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/label/popular',
    query: ['limit', 'start'],
  },
});
