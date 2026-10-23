import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentGetWatchesForPage = defineTool({
  name: 'cloud_v1:content:get_watches_for_page',
  description:
    '[Cloud v1] Get watches for page. Returns the watches for a page. A user that watches a page will receive receive notifications when the page is updated.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content to be queried for its watches.',
      },
      start: {
        type: 'integer',
        description: 'The starting index of the returned watches.',
      },
      limit: {
        type: 'integer',
        description:
          'The maximum number of watches to return per page. Note, this may be restricted by fixed system limits.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/rest/api/content/{id}/notification/child-created',
    query: ['start', 'limit'],
  },
});
