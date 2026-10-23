import { defineTool, input, string } from '@usemcpkit/core';
import { ISSUE_KEY } from '../../const';

export const transitionIssue = defineTool({
  name: 'issue:transition',
  description: 'Move an issue through its workflow; get transition ids from transition:list.',
  input: input({ issue_key: ISSUE_KEY, transition_id: string('Transition id') }),
  request: {
    method: 'POST',
    path: '/rest/api/2/issue/{issue_key}/transitions',
    body: { 'transition.id': 'transition_id' },
  },
});
