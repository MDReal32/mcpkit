import { defineTool } from '@usemcpkit/core';

export const cloudPagesGetCustomContentByTypeInPage = defineTool({
  name: 'cloud:pages:get_custom_content_by_type_in_page',
  description:
    '[Cloud] Get custom content by type in page. Returns all custom content for a given type within a given page. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the page for which custom content should be returned.',
      },
      type: {
        type: 'string',
        description:
          'The type of custom content being requested. See: https://developer.atlassian.com/cloud/confluence/custom-content/ for additional details on custom content.',
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
      body_format: {
        type: 'string',
        description:
          'The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
        enum: ['raw', 'storage', 'atlas_doc_format'],
      },
    },
    required: ['id', 'type'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/pages/{id}/custom-content',
    query: {
      type: 'type',
      sort: 'sort',
      cursor: 'cursor',
      limit: 'limit',
      'body-format': 'body_format',
    },
  },
});
