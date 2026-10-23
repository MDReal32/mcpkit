import { defineTool } from '@usemcpkit/core';

export const cloudAttachmentsGetAttachmentThumbnailById = defineTool({
  name: 'cloud:attachments:get_attachment_thumbnail_by_id',
  description:
    "[Cloud] Download attachment thumbnail by id. Redirects the client to a URL that serves an attachment thumbnail's binary data.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description:
          "The ID of the attachment to be returned. If you don't know the attachment's ID, use Get attachments for page/blogpost/custom content.",
      },
      version: {
        type: 'integer',
        description:
          "Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its details.",
      },
      height: {
        type: 'integer',
        description: 'Allows you to define the thumbnail height.',
      },
      width: {
        type: 'integer',
        description: 'Allows you to define the thumbnail width.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/attachments/{id}/thumbnail/download',
    query: ['version', 'height', 'width'],
  },
});
