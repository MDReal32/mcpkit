import { defineTool } from '@usemcpkit/core';

export const issuesResourceEventsGetProjectsIssuesResourceIterationEvents = defineTool({
  name: 'issues:resource_events:get_projects_issues_resource_iteration_events',
  description: 'Retrieve an issue iteration event. Retrieves an iteration event for a specified issue.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      event_id: {
        type: 'string',
        description: 'ID of the resource iteration event.',
      },
      eventable_id: {
        type: 'string',
        description: 'ID of the eventable.',
      },
    },
    required: ['id', 'event_id', 'eventable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{eventable_id}/resource_iteration_events/{event_id}',
  },
});
