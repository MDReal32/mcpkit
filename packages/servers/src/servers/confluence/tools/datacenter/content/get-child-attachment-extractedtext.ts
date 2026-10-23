import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetChildAttachmentExtractedtext = defineTool({
  name: 'datacenter:content:get_child_attachment_extractedtext',
  description: '[Data Center] ',
  input: {
    type: 'object',
    properties: {
      attachmentId: {
        type: 'string',
      },
      id: {
        type: 'string',
      },
      limit: {
        type: 'integer',
      },
    },
    required: ['attachmentId', 'id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/child/attachment/{attachmentId}/extractedtext',
    query: ['limit'],
  },
});
