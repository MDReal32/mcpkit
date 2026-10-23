import { defineTool, input, string } from '@usemcpkit/core';
import { ISSUE_KEY } from '../../const';

export const addComment = defineTool({
  name: 'comment:add',
  description: 'Add a comment to an issue.',
  input: input({ issue_key: ISSUE_KEY, body: string('Comment text (Jira wiki markup)') }),
  request: { method: 'POST', path: '/rest/api/2/issue/{issue_key}/comment', body: ['body'] },
  response: { fields: { id: 'id', created: 'created' } },
});
