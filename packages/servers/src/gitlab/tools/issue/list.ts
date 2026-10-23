import { defineTool, input, optional, string } from '@usemcpkit/core';
import { ISSUE_FIELDS, ISSUE_STATE_FILTER, PAGE, PER_PAGE, PROJECT } from '../../const';

export const listIssues = defineTool({
  name: 'issue:list',
  description: 'List issues in a project.',
  input: input({
    project: PROJECT,
    state: ISSUE_STATE_FILTER,
    labels: optional(string('Comma-separated label names')),
    search: optional(string('Match against title and description')),
    per_page: PER_PAGE,
    page: PAGE,
  }),
  request: {
    method: 'GET',
    path: '/projects/{project}/issues',
    query: ['state', 'labels', 'search', 'per_page', 'page'],
  },
  response: { fields: ISSUE_FIELDS },
});
