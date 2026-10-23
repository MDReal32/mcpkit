import { defineTool } from '@usemcpkit/core';

export const groupsGroupsListGroupsTransferLocations = defineTool({
  name: 'groups:groups:list_groups_transfer_locations',
  description:
    'List all transfer locations for a group. Lists all groups that a specified source group can be transferred to.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      search: {
        type: 'string',
        description: 'Group name to search for.',
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
    path: '/groups/{id}/transfer_locations',
    query: ['search', 'page', 'per_page'],
  },
});
