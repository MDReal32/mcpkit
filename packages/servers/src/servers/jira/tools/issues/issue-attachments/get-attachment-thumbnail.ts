import { defineTool } from '@usemcpkit/core';

export const issuesIssueAttachmentsGetAttachmentThumbnail = defineTool({
  name: 'issues:issue_attachments:get_attachment_thumbnail',
  description: 'Get attachment thumbnail. Returns the thumbnail of an attachment.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the attachment.',
      },
      redirect: {
        type: 'boolean',
        default: true,
        description:
          'Whether a redirect is provided for the attachment download. Clients that do not automatically follow redirects can set this to `false` to avoid making multiple requests to download the attachment.',
      },
      fallbackToDefault: {
        type: 'boolean',
        default: true,
        description: 'Whether a default thumbnail is returned when the requested thumbnail is not found.',
      },
      width: {
        type: 'integer',
        description: 'The maximum width to scale the thumbnail to.',
      },
      height: {
        type: 'integer',
        description: 'The maximum height to scale the thumbnail to.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/attachment/thumbnail/{id}',
    query: ['redirect', 'fallbackToDefault', 'width', 'height'],
  },
});
