import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsGetProjectsMergeRequestsVersions = defineTool({
  name: 'issues:merge_requests:get_projects_merge_requests_versions',
  description: 'Retrieve a merge request diff version. Retrieves a merge request diff version.',
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
      version_id: {
        type: 'integer',
        description: 'ID of the merge request diff version.',
      },
      unidiff: {
        type: 'boolean',
        default: false,
        description: 'If `true`, presents diffs in the unified diff format.',
      },
    },
    required: ['id', 'merge_request_iid', 'version_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/versions/{version_id}',
    query: ['unidiff'],
  },
});
