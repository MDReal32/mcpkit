import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetContent = defineTool({
  name: 'datacenter:space:get_content',
  description: '[Data Center] Get contents in space. Returns the content in this given space.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'the key of the space to update.',
      },
      expand: {
        type: 'string',
        description: 'a comma separated list of properties to expand on the space.',
      },
      depth: {
        type: 'string',
        description:
          'a string indicating if all content, or just the root content of the space is returned. Default value: <code>all</code>. Valid values: <code>all, root</code>.',
      },
      limit: {
        type: 'integer',
        description: 'the limit of the number of labels to return, this may be restricted by fixed system limits.',
      },
      start: {
        type: 'integer',
        description: 'he start point of the collection to return.',
      },
    },
    required: ['spaceKey'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/space/{spaceKey}/content',
    query: ['expand', 'depth', 'limit', 'start'],
  },
});
