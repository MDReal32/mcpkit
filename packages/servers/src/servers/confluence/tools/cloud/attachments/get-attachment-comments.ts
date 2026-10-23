import { defineTool } from '@usemcpkit/core';

export const cloudAttachmentsGetAttachmentComments = defineTool({
  name: 'cloud:attachments:get_attachment_comments',
  description:
    '[Cloud] Get attachment comments. Returns the comments of the specific attachment. The number of results is limited by the `limit` parameter and additional results (if available) will be available through the `next` URL present in the `Link` response header.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the attachment for which comments should be returned.',
      },
      body_format: {
        type: 'string',
        description:
          'The content format type to be returned in the `body` field of the response. If available, the representation will be available under a response field of the same name under the `body` field.',
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
          'Maximum number of comments per result to return. If more results exist, use the `Link` header to retrieve a relative URL that will return the next set of results.',
      },
      sort: {
        type: 'string',
        description: 'Used to sort the result by a particular field.',
        enum: ['created-date', '-created-date', 'modified-date', '-modified-date'],
      },
      version: {
        type: 'integer',
        description:
          'Version number of the attachment to retrieve comments for. If no version provided, retrieves comments for the latest version.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/attachments/{id}/footer-comments',
    query: {
      'body-format': 'body_format',
      cursor: 'cursor',
      limit: 'limit',
      sort: 'sort',
      version: 'version',
    },
  },
});
