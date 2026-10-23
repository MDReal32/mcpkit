import { defineTool } from '@usemcpkit/core';

export const groupsAccessRequestsListGroupsAccessRequests = defineTool({
  name: 'groups:access_requests:list_groups_access_requests',
  description:
    'List all access requests for a group. Lists all access requests for a specified group that are viewable by the authenticated user.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
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
    path: '/groups/{id}/access_requests',
    query: ['page', 'per_page'],
  },
});
