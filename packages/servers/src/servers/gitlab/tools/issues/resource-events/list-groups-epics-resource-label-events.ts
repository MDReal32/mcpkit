import { defineTool } from '@usemcpkit/core';

export const issuesResourceEventsListGroupsEpicsResourceLabelEvents = defineTool({
  name: 'issues:resource_events:list_groups_epics_resource_label_events',
  description: 'List all group epic label events. Lists all label events for a specified epic.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      eventable_id: {
        type: 'string',
        description: 'The ID of the epic',
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
    path: '/groups/{id}/epics/{eventable_id}/resource_label_events',
    query: ['page', 'per_page'],
  },
});
