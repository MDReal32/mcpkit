import { defineTool } from '@usemcpkit/core';

export const issuesMergeRequestsDeleteProjectsMergeRequestsBlocks = defineTool({
  name: 'issues:merge_requests:delete_projects_merge_requests_blocks',
  description: 'Remove a merge request dependency. Removes a merge request dependency.',
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
      block_id: {
        type: 'integer',
        description: 'ID of the merge request block.',
      },
    },
    required: ['id', 'merge_request_iid', 'block_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/merge_requests/{merge_request_iid}/blocks/{block_id}',
  },
});
