import { defineTool } from '@usemcpkit/core';

export const datacenterGroupGetInfo = defineTool({
  name: 'datacenter:group:get_info',
  description: '[Data Center] Get group by name. Get the user group with the group name',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
      },
      groupName: {
        type: 'string',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/group/info',
    query: ['expand', 'groupName'],
  },
});
