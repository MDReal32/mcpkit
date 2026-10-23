import { defineTool } from '@usemcpkit/core';

export const issuesResourceEventsGetProjectsIssuesResourceStateEvents = defineTool({
  name: 'issues:resource_events:get_projects_issues_resource_state_events',
  description: 'Retrieve an issue state event. Retrieves a state event for a specified project issue.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      eventable_id: {
        type: 'integer',
        description: 'The IID of the issue',
      },
      event_id: {
        type: 'integer',
        description: 'ID of the resource state event.',
      },
    },
    required: ['id', 'eventable_id', 'event_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{eventable_id}/resource_state_events/{event_id}',
  },
});
