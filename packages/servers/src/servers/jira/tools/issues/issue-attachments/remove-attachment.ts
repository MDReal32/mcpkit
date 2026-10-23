import { defineTool } from '@usemcpkit/core';

export const issuesIssueAttachmentsRemoveAttachment = defineTool({
  name: 'issues:issue_attachments:remove_attachment',
  description: 'Delete attachment. Deletes an attachment from an issue.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the attachment.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/attachment/{id}',
  },
});
