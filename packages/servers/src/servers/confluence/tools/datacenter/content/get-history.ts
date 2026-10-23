import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetHistory = defineTool({
  name: 'datacenter:content:get_history',
  description:
    '[Data Center] Get history of content. Returns the history of a particular piece of content. Example request URI(s):',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'the id of the content.',
      },
      expand: {
        type: 'string',
        description:
          'a comma separated list of properties to expand on the content. Default value: <code>previousVersion,nextVersion,lastUpdated</code>.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/history',
    query: ['expand'],
  },
});
