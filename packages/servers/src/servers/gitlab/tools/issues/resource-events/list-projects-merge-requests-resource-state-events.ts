import { defineTool } from '@usemcpkit/core';

export const issuesResourceEventsListProjectsMergeRequestsResourceStateEvents = defineTool({
  name: 'issues:resource_events:list_projects_merge_requests_resource_state_events',
  description: 'List all project merge request state events. Lists all state events for a specified merge request.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      eventable_id: {
        type: 'integer',
        description: 'The IID of the merge request',
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
    path: '/projects/{id}/merge_requests/{eventable_id}/resource_state_events',
    query: ['page', 'per_page'],
  },
});
