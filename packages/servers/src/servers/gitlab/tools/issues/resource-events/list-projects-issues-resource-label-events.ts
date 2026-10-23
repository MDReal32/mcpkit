import { defineTool } from '@usemcpkit/core';

export const issuesResourceEventsListProjectsIssuesResourceLabelEvents = defineTool({
  name: 'issues:resource_events:list_projects_issues_resource_label_events',
  description: 'List all project issue label events. Lists all label events for a specified issue.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      eventable_id: {
        type: 'string',
        description: 'The IID of the issue',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'eventable_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{eventable_id}/resource_label_events',
    query: ['page', 'per_page'],
  },
});
