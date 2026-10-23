import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetChild = defineTool({
  name: 'datacenter:content:get_child',
  description:
    '[Data Center] Get children of content. Returns a map of the direct children of a piece of Content. Content can have multiple types of children. For example, a Page can have children that are also Pages, but it can also have Comments and Attachments.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      expand: {
        type: 'string',
        description: 'a comma separated list of properties to expand on the children',
      },
      limit: {
        type: 'integer',
        description: 'how many items should be returned after the start index',
      },
      start: {
        type: 'integer',
        description: 'the index of the first item within the result set that should be returned',
      },
      parentVersion: {
        type: 'integer',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/child',
    query: ['expand', 'limit', 'start', 'parentVersion'],
  },
});
