import { defineTool } from '@usemcpkit/core';

export const cloudAttachmentsGetAttachmentVersions = defineTool({
  name: 'cloud:attachments:get_attachment_versions',
  description: '[Cloud] Get attachment versions. Returns the versions of specific attachment.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description:
          "The ID of the attachment to be queried for its versions. If you don't know the attachment ID, use Get attachments and filter the results.",
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
    path: '/wiki/api/v2/attachments/{id}/versions',
    query: ['cursor', 'limit', 'sort'],
  },
});
