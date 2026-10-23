import { defineTool } from '@usemcpkit/core';

export const cloudAttachmentsDeleteAttachment = defineTool({
  name: 'cloud:attachments:delete_attachment',
  description: '[Cloud] Delete attachment. Delete an attachment by id.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the attachment to be deleted.',
      },
      purge: {
        type: 'boolean',
        description: 'If attempting to purge the attachment.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/api/v2/attachments/{id}',
    query: ['purge'],
  },
});
