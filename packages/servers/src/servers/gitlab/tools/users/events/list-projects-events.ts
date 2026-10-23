import { defineTool } from '@usemcpkit/core';

export const usersEventsListProjectsEvents = defineTool({
  name: 'users:events:list_projects_events',
  description:
    'List all visible events for a project. Lists all visible events for a specified project. When a push exceeds the Push event activities limit, a single bulk push event is returned instead of individual commit events. Bulk push events have limited commit details: `commit_count` is `0`, `ref_count` shows the number of refs pushed, and individual commit attributes are `null`.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/events',
    query: ['action', 'target_type', 'before', 'after', 'sort', 'page', 'per_page'],
  },
});
