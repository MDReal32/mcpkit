import { defineTool } from '@usemcpkit/core';

export const cloudCustomContentGetCustomContentByType = defineTool({
  name: 'cloud:custom_content:get_custom_content_by_type',
  description:
    '[Cloud] Get custom content by type. Returns all custom content for a given type. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        description:
          'The type of custom content being requested. See: https://developer.atlassian.com/cloud/confluence/custom-content/ for additional details on custom content.',
      },
      id: {
        type: 'string',
        description:
          'Filter the results based on custom content ids. Multiple custom content ids can be specified as a comma-separated list. (comma-separated)',
      },
      space_id: {
        type: 'string',
        description:
          'Filter the results based on space ids. Multiple space ids can be specified as a comma-separated list. (comma-separated)',
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
    required: ['type'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/custom-content',
    query: {
      type: 'type',
      id: 'id',
      'space-id': 'space_id',
      sort: 'sort',
      cursor: 'cursor',
      limit: 'limit',
      'body-format': 'body_format',
    },
  },
});
