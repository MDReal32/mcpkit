import { defineTool } from '@usemcpkit/core';

export const issuesExternalStatusChecksCreateProjectsMergeRequestsStatusChecksRetry = defineTool({
  name: 'issues:external_status_checks:create_projects_merge_requests_status_checks_retry',
  description:
    'Retry failed status check for a merge request. Retries a specified failed external status check for a merge request. Even though the merge request has not changed, this endpoint resends the current state of merge request to the defined external service.',
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
      external_status_check_id: {
        type: 'integer',
        description: 'ID of the failed external status check.',
      },
    },
    required: ['id', 'merge_request_iid', 'external_status_check_id'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/status_checks/{external_status_check_id}/retry',
  },
});
