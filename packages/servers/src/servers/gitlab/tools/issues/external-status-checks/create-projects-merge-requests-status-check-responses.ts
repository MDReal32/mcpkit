import { defineTool } from '@usemcpkit/core';

export const issuesExternalStatusChecksCreateProjectsMergeRequestsStatusCheckResponses = defineTool({
  name: 'issues:external_status_checks:create_projects_merge_requests_status_check_responses',
  description:
    'Update status of an external status check. Updates the status of an external status check for a specified merge request, informing GitLab that a merge request has passed a check by an external service. To set the status of an external check, the personal access token used must belong to a user with the Developer, Maintainer, or Owner role on the target project of the merge request. Any user with permission to approve the merge request can…',
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
        description: 'ID of the external status check.',
      },
      sha: {
        type: 'string',
        description: 'SHA at `HEAD` of the source branch.',
      },
      status: {
        type: 'string',
        description: 'Status of the check.',
        enum: ['passed', 'failed', 'pending'],
      },
    },
    required: ['id', 'merge_request_iid', 'external_status_check_id', 'sha', 'status'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/status_check_responses',
    body: ['external_status_check_id', 'sha', 'status'],
  },
});
