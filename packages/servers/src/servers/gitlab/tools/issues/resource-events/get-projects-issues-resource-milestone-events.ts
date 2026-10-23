import { defineTool } from '@usemcpkit/core';

export const issuesResourceEventsGetProjectsIssuesResourceMilestoneEvents = defineTool({
  name: 'issues:resource_events:get_projects_issues_resource_milestone_events',
  description: 'Retrieve an issue milestone event. Retrieves a specified milestone event for a project issue.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      event_id: {
        type: 'string',
        description: 'ID of the resource milestone event.',
      },
      eventable_id: {
        type: 'string',
        description: 'Internal ID of the issue or merge request.',
      },
    },
    required: ['id', 'event_id', 'eventable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{eventable_id}/resource_milestone_events/{event_id}',
  },
});
