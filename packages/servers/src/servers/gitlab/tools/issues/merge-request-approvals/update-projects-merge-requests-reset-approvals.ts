import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestApprovalsUpdateProjectsMergeRequestsResetApprovals = defineTool({
  name: 'issues:merge_request_approvals:update_projects_merge_requests_reset_approvals',
  description:
    'Reset approvals for a merge request. Resets all approvals for a specified merge request. Available only to bot users with a valid project or group token. Human users receive a `401 Unauthorized` response.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      merge_request_iid: {
        type: 'integer',
        description: 'Internal ID of the merge request.',
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/reset_approvals',
  },
});
