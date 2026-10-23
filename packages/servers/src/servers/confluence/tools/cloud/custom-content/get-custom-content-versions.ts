import { defineTool } from '@usemcpkit/core';

export const cloudCustomContentGetCustomContentVersions = defineTool({
  name: 'cloud:custom_content:get_custom_content_versions',
  description: '[Cloud] Get custom content versions. Returns the versions of specific custom content.',
  input: {
    type: 'object',
    properties: {
      custom_content_id: {
        type: 'integer',
        description:
          "The ID of the custom content to be queried for its versions. If you don't know the custom content ID, use Get custom-content by type and filter the results.",
      },
      body_format: {
        type: 'string',
        description:
          'The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
        enum: ['raw', 'storage', 'atlas_doc_format'],
      },
      cursor: {
        type: 'string',
        description:
          'Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the relative URL in the `Link` header to retrieve the `next` set of results.',
      },
      limit: {
        type: 'integer',
        description:
          'Maximum number of versions per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
        enum: ['modified-date', '-modified-date'],
      },
    },
    required: ['custom_content_id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/custom-content/{custom_content_id}/versions',
    query: {
      'body-format': 'body_format',
      cursor: 'cursor',
      limit: 'limit',
      sort: 'sort',
    },
  },
});
