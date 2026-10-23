import { defineTool, input, string } from '@usemcpkit/core';
import { ISSUE_IID, PROJECT } from '../const';

export const addIssueComment = defineTool({
  name: 'add_issue_comment',
  description: 'Add a comment to an issue.',
  input: input({ project: PROJECT, issue_iid: ISSUE_IID, body: string('Comment text (markdown)') }),
  request: { method: 'POST', path: '/projects/{project}/issues/{issue_iid}/notes', body: ['body'] },
  response: { fields: { id: 'id', created_at: 'created_at' } },
});
