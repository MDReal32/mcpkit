import { defineTool } from '@usemcpkit/core';

export const cloudLabelsGetLabelAttachments = defineTool({
  name: 'cloud:labels:get_label_attachments',
  description:
    '[Cloud] Get attachments for label. Returns the attachments of specified label. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the label for which attachments should be returned.',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
        enum: ['created-date', '-created-date', 'modified-date', '-modified-date'],
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
    path: '/wiki/api/v2/labels/{id}/attachments',
    query: ['sort', 'cursor', 'limit'],
  },
});
