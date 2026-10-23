import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsGetProjectsMergeRequests = defineTool({
  name: 'issues:merge_requests:get_projects_merge_requests',
  description: 'Retrieve a merge request. Retrieves a merge request for a specified project.',
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
      render_html: {
        type: 'boolean',
        description: 'If `true`, the response includes rendered HTML for title and description.',
      },
      include_diverged_commits_count: {
        type: 'boolean',
        description: 'If `true`, the response includes the commits behind the target branch.',
      },
      include_rebase_in_progress: {
        type: 'boolean',
        description: 'If `true`, the response includes whether a rebase operation is in progress.',
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{merge_request_iid}',
    query: ['render_html', 'include_diverged_commits_count', 'include_rebase_in_progress'],
  },
});
