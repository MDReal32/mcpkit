import { defineTool } from '@usemcpkit/core';

export const issuesIssueRemoteLinksDeleteRemoteIssueLinkById = defineTool({
  name: 'issues:issue_remote_links:delete_remote_issue_link_by_id',
  description: 'Delete remote issue link by ID. Deletes a remote issue link from an issue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      linkId: {
        type: 'string',
        description: 'The ID of a remote issue link.',
      },
    },
    required: ['issueIdOrKey', 'linkId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issue/{issueIdOrKey}/remotelink/{linkId}',
  },
});
