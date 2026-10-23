import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetIssueLimitReport = defineTool({
  name: 'issues:issues:get_issue_limit_report',
  description: 'Get issue limit report. Returns all issues breaching and approaching per-issue limits.',
  input: {
    type: 'object',
    properties: {
      isReturningKeys: {
        type: 'boolean',
        default: false,
        description: 'Return issue keys instead of issue ids in the response.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/limit/report',
    query: ['isReturningKeys'],
  },
});
