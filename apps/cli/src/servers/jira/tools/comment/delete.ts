import { defineTool, input, string } from '@usemcpkit/core';
import { ISSUE_KEY } from '../../const';

export const deleteComment = defineTool({
  name: 'comment:delete',
  description: 'Permanently delete a comment from an issue; get comment ids from issue:get or comment:add.',
  input: input({ issue_key: ISSUE_KEY, comment_id: string('Comment id') }),
  request: { method: 'DELETE', path: '/rest/api/2/issue/{issue_key}/comment/{comment_id}' },
});
