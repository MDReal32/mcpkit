import { defineTool } from '@usemcpkit/core';

export const cloudLabelsGetLabelPages = defineTool({
  name: 'cloud:labels:get_label_pages',
  description:
    '[Cloud] Get pages for label. Returns the pages of specified label. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the label for which pages should be returned.',
      },
      space_id: {
        type: 'string',
        description:
          'Filter the results based on space ids. Multiple space ids can be specified as a comma-separated list. (comma-separated)',
      },
      body_format: {
        type: 'string',
        description:
          'The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
        enum: ['storage', 'atlas_doc_format'],
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
        enum: ['id', '-id', 'created-date', '-created-date', 'modified-date', '-modified-date', 'title', '-title'],
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
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/labels/{id}/pages',
    query: {
      'space-id': 'space_id',
      'body-format': 'body_format',
      sort: 'sort',
      cursor: 'cursor',
      limit: 'limit',
    },
  },
});
