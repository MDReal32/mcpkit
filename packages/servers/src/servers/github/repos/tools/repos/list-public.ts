import { defineTool } from '@usemcpkit/core';

export const reposListPublic = defineTool({
  name: 'repos:list_public',
  description: 'List public repositories. Lists all public repositories in the order that they were created.',
  input: {
    type: 'object',
    properties: {
      since: {
        type: 'integer',
        description: 'A repository ID. Only return repositories with an ID greater than this ID.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/repositories',
    query: ['since'],
  },
});
