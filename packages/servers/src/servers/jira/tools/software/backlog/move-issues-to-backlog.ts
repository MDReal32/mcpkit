import { defineTool } from '@usemcpkit/core';

export const softwareBacklogMoveIssuesToBacklog = defineTool({
  name: 'software:backlog:move_issues_to_backlog',
  description:
    'Move issues to backlog. Move issues to the backlog. This operation is equivalent to remove future and active sprints from a given set of issues. At most 50 issues may be moved at once.',
  input: {
    type: 'object',
    properties: {
      issues: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/agile/1.0/backlog/issue',
    body: ['issues'],
  },
});
