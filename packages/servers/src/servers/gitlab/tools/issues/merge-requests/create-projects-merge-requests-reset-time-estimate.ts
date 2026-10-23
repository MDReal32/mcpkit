import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsCreateProjectsMergeRequestsResetTimeEstimate = defineTool({
  name: 'issues:merge_requests:create_projects_merge_requests_reset_time_estimate',
  description:
    'Reset the estimated time for a merge request. Resets the estimated time for a specified merge request to `0` seconds.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      merge_request_iid: {
        type: 'integer',
        description: 'The internal ID of the merge_request.',
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/reset_time_estimate',
  },
});
