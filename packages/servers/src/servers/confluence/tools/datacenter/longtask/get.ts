import { defineTool } from '@usemcpkit/core';

export const datacenterLongtaskGet = defineTool({
  name: 'datacenter:longtask:get',
  description: '[Data Center] Get task by ID. Returns information about a long-running task.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'the key of the task to be returned.',
      },
      expand: {
        type: 'string',
        description: 'a comma separated list of properties to expand on the task.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/longtask/{id}',
    query: ['expand'],
  },
});
