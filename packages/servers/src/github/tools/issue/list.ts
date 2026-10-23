import { defineTool, input, optional, string } from '@usemcpkit/core';
import { ISSUE_FIELDS, PAGE, PER_PAGE, REPO_PARAMS, STATE_FILTER } from '../../const';

export const listIssues = defineTool({
  name: 'issue:list',
  description: 'List issues in a repository.',
  input: input({
    ...REPO_PARAMS,
    state: STATE_FILTER,
    labels: optional(string('Comma-separated label names')),
    per_page: PER_PAGE,
    page: PAGE,
  }),
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/issues',
    query: ['state', 'labels', 'per_page', 'page'],
  },
  response: { fields: ISSUE_FIELDS },
});
