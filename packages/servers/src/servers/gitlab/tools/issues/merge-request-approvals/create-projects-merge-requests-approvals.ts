import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestApprovalsCreateProjectsMergeRequestsApprovals = defineTool({
  name: 'issues:merge_request_approvals:create_projects_merge_requests_approvals',
  description:
    '[Deprecated] Change approval-related configuration. Deprecated in 16.0. Use the merge request approvals API instead.',
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
      approvals_required: {
        type: 'integer',
        description: 'Number of approvals required for the merge request.',
      },
    },
    required: ['id', 'merge_request_iid', 'approvals_required'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/approvals',
    body: ['approvals_required'],
  },
});
