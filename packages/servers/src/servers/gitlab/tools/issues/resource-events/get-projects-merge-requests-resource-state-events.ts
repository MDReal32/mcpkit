import { defineTool } from '@usemcpkit/core';

export const issuesResourceEventsGetProjectsMergeRequestsResourceStateEvents = defineTool({
  name: 'issues:resource_events:get_projects_merge_requests_resource_state_events',
  description: 'Retrieve a merge request state event. Retrieves a state event for a specified project merge request.',
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
      event_id: {
        type: 'integer',
        description: 'ID of the resource state event.',
      },
    },
    required: ['id', 'eventable_id', 'event_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/merge_requests/{eventable_id}/resource_state_events/{event_id}',
  },
});
