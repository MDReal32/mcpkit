import { defineTool } from '@usemcpkit/core';

export const cloudInlineCommentsGetInlineCommentVersions = defineTool({
  name: 'cloud:inline_comments:get_inline_comment_versions',
  description: '[Cloud] Get inline comment versions. Retrieves the versions of the specified inline comment.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the inline comment for which versions should be returned',
      },
      body_format: {
        type: 'string',
        description:
          'The content format types to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
        enum: ['storage', 'atlas_doc_format'],
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
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/inline-comments/{id}/versions',
    query: {
      'body-format': 'body_format',
      cursor: 'cursor',
      limit: 'limit',
      sort: 'sort',
    },
  },
});
