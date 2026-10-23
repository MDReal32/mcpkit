import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsUpdateProjectsMergeRequestsRebase = defineTool({
  name: 'issues:merge_requests:update_projects_merge_requests_rebase',
  description:
    'Rebase a merge request. Rebases a merge request. Automatically rebases the `source_branch` of the merge request against its `target_branch`.',
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
      skip_ci: {
        type: 'boolean',
        description: 'If `true`, skips creating a CI pipeline.',
      },
    },
    required: ['id', 'merge_request_iid'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/rebase',
    body: ['skip_ci'],
  },
});
