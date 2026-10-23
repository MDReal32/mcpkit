import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetChangeLogs = defineTool({
  name: 'issues:issues:get_change_logs',
  description:
    'Get changelogs. Returns a paginated list of all changelogs for an issue sorted by date, starting from the oldest.',
  input: {
    type: 'object',
    properties: {
      issueIdOrKey: {
        type: 'string',
        description: 'The ID or key of the issue.',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 100,
        description: 'The maximum number of items to return per page.',
      },
    },
    required: ['issueIdOrKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issue/{issueIdOrKey}/changelog',
    query: ['startAt', 'maxResults'],
  },
});
