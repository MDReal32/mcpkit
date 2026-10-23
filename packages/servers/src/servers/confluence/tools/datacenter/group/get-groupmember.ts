import { defineTool } from '@usemcpkit/core';

export const datacenterGroupGetGroupmember = defineTool({
  name: 'datacenter:group:get_groupmember',
  description: '[Data Center] Get group members of group. Get a collection of child groups of the given group',
  input: {
    type: 'object',
    properties: {
      expand: {
        type: 'string',
      },
      groupName: {
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
    path: '/rest/api/group/groupmember',
    query: ['expand', 'groupName', 'limit', 'start'],
  },
});
