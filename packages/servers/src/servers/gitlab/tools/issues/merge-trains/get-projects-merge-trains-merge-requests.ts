import { defineTool } from '@usemcpkit/core';

export const issuesMergeTrainsGetProjectsMergeTrainsMergeRequests = defineTool({
  name: 'issues:merge_trains:get_projects_merge_trains_merge_requests',
  description: 'Retrieve merge train status. Retrieves the merge train status of a specified merge request.',
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
    path: '/projects/{id}/merge_trains/merge_requests/{merge_request_iid}',
  },
});
