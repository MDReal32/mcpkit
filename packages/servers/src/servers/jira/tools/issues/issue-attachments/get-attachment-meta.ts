import { defineTool } from '@usemcpkit/core';

export const issuesIssueAttachmentsGetAttachmentMeta = defineTool({
  name: 'issues:issue_attachments:get_attachment_meta',
  description:
    'Get Jira attachment settings. Returns the attachment settings, that is, whether attachments are enabled and the maximum attachment size allowed.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/attachment/meta',
  },
});
