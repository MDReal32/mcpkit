import { defineTool } from '@usemcpkit/core';

export const projectsBadgesListGroupsBadges = defineTool({
  name: 'projects:badges:list_groups_badges',
  description: 'List all badges for a group. Lists all badges for a specified group.',
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
      name: {
        type: 'string',
        description: 'Name of the badge.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/badges',
    query: ['page', 'per_page', 'name'],
  },
});
