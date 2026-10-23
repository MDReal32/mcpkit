import { defineTool } from '@usemcpkit/core';

export const datacenterUserGetList = defineTool({
  name: 'datacenter:user:get_list',
  description:
    '[Data Center] Get registered users. Gets a paginated collection of all registered users, including but not limited to:',
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
    path: '/rest/api/user/list',
    query: ['expand', 'limit', 'start'],
  },
});
