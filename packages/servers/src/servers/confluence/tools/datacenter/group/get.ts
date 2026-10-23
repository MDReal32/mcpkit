import { defineTool } from '@usemcpkit/core';

export const datacenterGroupGet = defineTool({
  name: 'datacenter:group:get',
  description: '[Data Center] Get group by name. Get the user group with the group name',
  input: {
    type: 'object',
    properties: {
      groupName: {
        type: 'string',
      },
      expand: {
        type: 'string',
      },
    },
    required: ['groupName'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/group/{groupName}',
    query: ['expand'],
  },
});
