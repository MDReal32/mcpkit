import { defineTool } from '@usemcpkit/core';

export const cloudLabelsGetLabels = defineTool({
  name: 'cloud:labels:get_labels',
  description:
    '[Cloud] Get labels. Returns all labels. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      label_id: {
        type: 'string',
        description: 'Filters on label ID. Multiple IDs can be specified as a comma-separated list. (comma-separated)',
      },
      prefix: {
        type: 'string',
        description:
          'Filters on label prefix. Multiple IDs can be specified as a comma-separated list. (comma-separated)',
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of labels per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/labels',
    query: {
      'label-id': 'label_id',
      prefix: 'prefix',
      cursor: 'cursor',
      sort: 'sort',
      limit: 'limit',
    },
  },
});
