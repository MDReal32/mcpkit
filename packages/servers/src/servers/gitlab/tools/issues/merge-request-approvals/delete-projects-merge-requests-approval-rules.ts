import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestApprovalsDeleteProjectsMergeRequestsApprovalRules = defineTool({
  name: 'issues:merge_request_approvals:delete_projects_merge_requests_approval_rules',
  description:
    'Delete an approval rule for a merge request. Deletes a specified approval rule for a merge request. The `report_approver` or `code_owner` rules are system-generated, and you cannot edit them.',
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
      approval_rule_id: {
        type: 'integer',
        description: 'ID of the merge request approval rule.',
      },
    },
    required: ['id', 'merge_request_iid', 'approval_rule_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/approval_rules/{approval_rule_id}',
  },
});
