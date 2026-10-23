import { defineTool } from '@usemcpkit/core';

export const datacenterGroupGetGroupparent2 = defineTool({
  name: 'datacenter:group:get_groupparent_2',
  description:
    "[Data Center] Get group parents of a group. Get a collection of the given group's immediate parent groups",
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
    path: '/rest/api/group/{groupName}/groupparent',
    query: ['expand', 'limit', 'start'],
  },
});
