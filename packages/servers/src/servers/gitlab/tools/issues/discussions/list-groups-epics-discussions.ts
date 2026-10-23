import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsListGroupsEpicsDiscussions = defineTool({
  name: 'issues:discussions:list_groups_epics_discussions',
  description: 'List all discussions for an epic. Lists all discussions for a specified epic.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the epic.',
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
    required: ['id', 'noteable_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/epics/{noteable_id}/discussions',
    query: ['page', 'per_page'],
  },
});
