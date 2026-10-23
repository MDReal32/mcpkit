import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsListProjectsMergeRequestsDiscussions = defineTool({
  name: 'issues:discussions:list_projects_merge_requests_discussions',
  description: 'List all discussions for a merge request. Lists all discussions for a specified merge request.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the merge request.',
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
    required: ['id', 'noteable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{noteable_id}/discussions',
    query: ['page', 'per_page'],
  },
});
