import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsDeleteProjectsMergeRequestsContextCommits = defineTool({
  name: 'issues:merge_requests:delete_projects_merge_requests_context_commits',
  description: 'Delete context commits from a merge request. Deletes specified context commits from a merge request.',
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
      commits: {
        type: 'string',
        description: "Context commits' SHAs. (comma-separated)",
      },
    },
    required: ['id', 'merge_request_iid', 'commits'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/context_commits',
    query: ['commits'],
  },
});
