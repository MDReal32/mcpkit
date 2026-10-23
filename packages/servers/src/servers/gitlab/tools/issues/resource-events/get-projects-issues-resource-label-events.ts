import { defineTool } from '@usemcpkit/core';

export const issuesResourceEventsGetProjectsIssuesResourceLabelEvents = defineTool({
  name: 'issues:resource_events:get_projects_issues_resource_label_events',
  description: 'Retrieve an issue label event. Retrieves a label event for a specified project issue.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      event_id: {
        type: 'string',
        description: 'ID of the resource label event.',
      },
      eventable_id: {
        type: 'string',
        description: 'The IID of the issue',
      },
    },
    required: ['id', 'event_id', 'eventable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{eventable_id}/resource_label_events/{event_id}',
  },
});
