import { defineTool } from '@usemcpkit/core';

export const issuesIssueSearchCountIssues = defineTool({
  name: 'issues:issue_search:count_issues',
  description:
    'Count issues using JQL. Provide an estimated count of the issues that match the JQL. Recent updates might not be immediately visible in the returned output. This endpoint requires JQL to be bounded.',
  input: {
    type: 'object',
    properties: {
      jql: {
        type: 'string',
        description:
          'A JQL expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction.',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/search/approximate-count',
    body: ['jql'],
  },
});
