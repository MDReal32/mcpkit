import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetChildComment = defineTool({
  name: 'datacenter:content:get_child_comment',
  description:
    '[Data Center] Get comments of content. Returns the comments of a piece of Content. Example request URI(s):',
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
      depth: {
        type: 'string',
        description: '(optional, default: "") the depth of the comments. Possible values are: "" (ROOT only), "all"',
      },
      limit: {
        type: 'integer',
        description: 'how many items should be returned after the start index',
      },
      start: {
        type: 'integer',
        description: 'the index of the first item within the result set that should be returned',
      },
      location: {
        type: 'string',
        description:
          '(optional, default: "" means all) the location of the comments. Possible values are: "inline", "footer", "resolved". You can define multiple location params. The results will be the comments matched by any location. (comma-separated)',
      },
      parentVersion: {
        type: 'integer',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/child/comment',
    query: ['expand', 'depth', 'limit', 'start', 'location', 'parentVersion'],
  },
});
