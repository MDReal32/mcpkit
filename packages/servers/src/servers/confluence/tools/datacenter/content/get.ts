import { defineTool } from '@usemcpkit/core';

export const datacenterContentGet = defineTool({
  name: 'datacenter:content:get',
  description: '[Data Center] Get content by ID. Returns a piece of Content. Example request URI(s):',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'the id of the content.',
      },
      xoauth_requestor_id: {
        type: 'string',
      },
      expand: {
        type: 'string',
        description:
          'A comma separated list of properties to expand on the content. Default value: <code>history,space,version</code>.',
      },
      version: {
        type: 'integer',
        description: 'version of the content.',
      },
      status: {
        type: 'string',
        description: 'list of Content statuses to filter results on. (comma-separated)',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}',
    query: ['xoauth_requestor_id', 'expand', 'version', 'status'],
  },
});
