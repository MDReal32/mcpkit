import { defineTool } from '@usemcpkit/core';

export const datacenterContentDeleteChildAttachment = defineTool({
  name: 'datacenter:content:delete_child_attachment',
  description: '[Data Center] Remove attachment. This method will delete the attachment identified by attachmentId.',
  input: {
    type: 'object',
    properties: {
      attachmentId: {
        type: 'string',
        description: 'the id of the attachment to be removed.',
      },
      id: {
        type: 'string',
        description: 'The id of the content the attachment is on.',
      },
    },
    required: ['attachmentId', 'id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/content/{id}/child/attachment/{attachmentId}',
  },
});
