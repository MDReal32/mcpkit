import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsCreateProjectsMergeRequestsCancelAutoMerge = defineTool({
  name: 'issues:merge_requests:create_projects_merge_requests_cancel_auto_merge',
  description:
    'Cancel auto merge. Cancels an automatic merge for a merge request that has been set to merge automatically. Use this endpoint instead of `cancel_merge_when_pipeline_succeeds`, which returns a status hash rather than the merge request.',
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
    method: 'POST',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/cancel_auto_merge',
  },
});
