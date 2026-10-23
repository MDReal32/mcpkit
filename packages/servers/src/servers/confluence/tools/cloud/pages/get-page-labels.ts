import { defineTool } from '@usemcpkit/core';

export const cloudPagesGetPageLabels = defineTool({
  name: 'cloud:pages:get_page_labels',
  description:
    '[Cloud] Get labels for page. Returns the labels of specific page. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the page for which labels should be returned.',
      },
      prefix: {
        type: 'string',
        enum: ['my', 'team', 'global', 'system'],
        description: 'Filter the results to labels based on their prefix.',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of labels per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/pages/{id}/labels',
    query: ['prefix', 'sort', 'cursor', 'limit'],
  },
});
