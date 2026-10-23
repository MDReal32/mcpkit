import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetEvents = defineTool({
  name: 'issues:issues:get_events',
  description: 'Get events. Returns all issue events.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/events',
  },
});
