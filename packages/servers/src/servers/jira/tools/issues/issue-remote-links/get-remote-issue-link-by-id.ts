import { defineTool } from '@usemcpkit/core';

export const issuesIssueRemoteLinksGetRemoteIssueLinkById = defineTool({
  name: 'issues:issue_remote_links:get_remote_issue_link_by_id',
  description: 'Get remote issue link by ID. Returns a remote issue link for an issue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      linkId: {
        type: 'string',
        description: 'The ID of the remote issue link.',
      },
    },
    required: ['issueIdOrKey', 'linkId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/remotelink/{linkId}',
  },
});
