import { defineTool } from '@usemcpkit/core';

export const issuesIssuesGetEvent = defineTool({
  name: 'issues:issues:get_event',
  description: 'Get an issue event. Gets a single event by the event id.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      event_id: {
        type: 'integer',
      },
    },
    required: ['owner', 'repo', 'event_id'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/issues/events/{event_id}',
  },
});
