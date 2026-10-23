import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetLabel = defineTool({
  name: 'datacenter:content:get_label',
  description: '[Data Center] Get labels. Returns the list of labels on a piece of Content. Example request URI(s):',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      prefix: {
        type: 'string',
        description: 'the prefixes to filter the labels with. (comma-separated)',
      },
      limit: {
        type: 'integer',
        description: 'the limit of the number of labels to return, this may be restricted by fixed system limits',
      },
      start: {
        type: 'integer',
        description: 'he start point of the collection to return.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/label',
    query: ['prefix', 'limit', 'start'],
  },
});
