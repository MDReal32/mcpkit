import { defineTool } from '@usemcpkit/core';

export const datacenterGroupList = defineTool({
  name: 'datacenter:group:list',
  description: '[Data Center] Get groups. Get a paginated collection of user groups',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
      },
      limit: {
        type: 'integer',
      },
      start: {
        type: 'integer',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/group',
    query: ['expand', 'limit', 'start'],
  },
});
