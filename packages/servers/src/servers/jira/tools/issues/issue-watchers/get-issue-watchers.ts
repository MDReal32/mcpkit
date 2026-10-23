import { defineTool } from '@usemcpkit/core';

export const issuesIssueWatchersGetIssueWatchers = defineTool({
  name: 'issues:issue_watchers:get_issue_watchers',
  description: 'Get issue watchers. Returns the watchers for an issue.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/watchers',
  },
});
