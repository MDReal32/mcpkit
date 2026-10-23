import { defineTool } from '@usemcpkit/core';

export const groupsMembersListGroupsBillableMembersMemberships = defineTool({
  name: 'groups:members:list_groups_billable_members_memberships',
  description:
    'List all memberships for a billable group member. Lists all memberships for a specified billable member of a group. The response represents only direct memberships. Inherited memberships are not included.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      user_id: {
        type: 'integer',
        description: 'ID of the user.',
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
    required: ['id', 'user_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/billable_members/{user_id}/memberships',
    query: ['page', 'per_page'],
  },
});
