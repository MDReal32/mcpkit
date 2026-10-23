import { defineTool } from '@usemcpkit/core';

export const usersEventsListEvents = defineTool({
  name: 'users:events:list_events',
  description:
    'List all events. Lists all events for the authenticated user. Does not return events associated with epics or merge requests. Returns bulk push events with limited commit details.',
  input: {
    type: 'object',
    properties: {
      scope: {
        type: 'string',
        description: "Include all events across the user's projects.",
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
      action: {
        type: 'string',
        description: 'Filter events by the specified action type.',
      },
      target_type: {
        type: 'string',
        enum: ['issue', 'milestone', 'merge_request', 'note', 'project', 'snippet', 'user', 'wiki', 'design'],
        description: 'Filter events by target type.',
      },
      before: {
        type: 'string',
        description: 'Return events created before the specified date.',
      },
      after: {
        type: 'string',
        description: 'Return events created after the specified date.',
      },
      sort: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order by creation date.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/events',
    query: ['scope', 'page', 'per_page', 'action', 'target_type', 'before', 'after', 'sort'],
  },
});
