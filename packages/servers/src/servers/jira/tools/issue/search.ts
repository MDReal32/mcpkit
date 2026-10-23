import { defineTool, input, number, optional, string } from '@usemcpkit/core';
import { ISSUE_LIST_FIELDS, ISSUE_SUMMARY_FIELDS, MAX_RESULTS } from '../../const';

export const searchIssues = defineTool({
  name: 'issue:search',
  description: 'Search issues with JQL, for example `project = PROJ AND status = "In Progress"`.',
  input: input({
    jql: string('JQL query (Cloud requires a restriction such as a project)'),
    max_results: MAX_RESULTS,
    start_at: optional(number('Index of the first result (Data Center only)')),
  }),
  request: {
    method: 'GET',
    path: '/rest/api/2/search',
    query: { jql: 'jql', maxResults: 'max_results', startAt: 'start_at' },
    fixedQuery: { fields: ISSUE_LIST_FIELDS },
  },
  response: { root: 'issues', fields: ISSUE_SUMMARY_FIELDS },
  editions: {
    cloud: {
      request: {
        method: 'GET',
        path: '/rest/api/2/search/jql',
        query: { jql: 'jql', maxResults: 'max_results' },
        fixedQuery: { fields: ISSUE_LIST_FIELDS },
      },
    },
  },
});
