import { defineTool, input, string } from '@mcpkit/core';
import { ISSUE_KEY } from '../const';

export const deleteComment = defineTool({
  name: 'delete_comment',
  description: 'Permanently delete a comment from an issue; get comment ids from get_issue or add_comment.',
  input: input({ issue_key: ISSUE_KEY, comment_id: string('Comment id') }),
  request: { method: 'DELETE', path: '/rest/api/2/issue/{issue_key}/comment/{comment_id}' },
});
