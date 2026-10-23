import { defineTool } from '@usemcpkit/core';

export const cloudPagesGetChildPages = defineTool({
  name: 'cloud:pages:get_child_pages',
  description:
    '[Cloud] [Deprecated] Get child pages. Returns all child pages for given page id. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: "The ID of the parent page. If you don't know the page ID, use Get pages and filter the results.",
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of pages per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/pages/{id}/children',
    query: ['cursor', 'limit', 'sort'],
  },
});
