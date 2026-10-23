import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestApprovalsListProjectsMergeRequestsApprovalRules = defineTool({
  name: 'issues:merge_request_approvals:list_projects_merge_requests_approval_rules',
  description:
    'List all approval rules for a merge request. Lists all approval rules and any associated details for a specified merge request. Use the `page` and `per_page` pagination parameters to restrict the list of approval rules.',
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
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/approval_rules',
    query: ['page', 'per_page'],
  },
});
