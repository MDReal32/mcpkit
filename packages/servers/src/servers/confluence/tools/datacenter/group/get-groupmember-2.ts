import { defineTool } from '@usemcpkit/core';

export const datacenterGroupGetGroupmember2 = defineTool({
  name: 'datacenter:group:get_groupmember_2',
  description: '[Data Center] Get group members of group. Get a collection of child groups of the given group',
  input: {
    type: 'object',
    properties: {
      groupName: {},
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
    required: ['groupName'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/group/{groupName}/groupmember',
    query: ['expand', 'limit', 'start'],
  },
});
