import { defineTool, input, string } from '@mcpkit/core';
import { MERGE_REQUEST_IID, PROJECT } from '../const';

export const addMergeRequestComment = defineTool({
  name: 'add_merge_request_comment',
  description: 'Add a comment to a merge request.',
  input: input({ project: PROJECT, merge_request_iid: MERGE_REQUEST_IID, body: string('Comment text (markdown)') }),
  request: {
    method: 'POST',
    path: '/projects/{project}/merge_requests/{merge_request_iid}/notes',
    body: ['body'],
  },
  response: { fields: { id: 'id', created_at: 'created_at' } },
});
