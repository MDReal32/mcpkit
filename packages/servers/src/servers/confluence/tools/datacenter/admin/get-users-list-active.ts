import { defineTool } from '@usemcpkit/core';

export const datacenterAdminGetUsersListActive = defineTool({
  name: 'datacenter:admin:get_users_list_active',
  description:
    '[Data Center] Get active users. Gets a paginated collection of all active users (users which count into license usage). This will exclude users that are: - anonymous, - deactivated, - externally deleted, - shadowed - unlicensed',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
        description: 'properties to expand on the user.',
      },
      limit: {
        type: 'integer',
        description: 'the limit of the number of users to return, this may be restricted by fixed system limits.',
      },
      start: {
        type: 'integer',
        description: 'the start point of the collection to return. This must be non-negative. Default value is 0.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/admin/users/list/active',
    query: ['expand', 'limit', 'start'],
  },
});
