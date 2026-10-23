import { defineTool } from '@usemcpkit/core';

export const issuesExternalStatusChecksListProjectsMergeRequestsStatusChecks = defineTool({
  name: 'issues:external_status_checks:list_projects_merge_requests_status_checks',
  description:
    'List all status checks for a merge request. Lists all external status check services for a specified merge request and their status.',
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
    method: 'GET',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/status_checks',
  },
});
