import { defineTool } from '@usemcpkit/core';

export const orgsOrgsGet = defineTool({
  name: 'orgs:orgs:get',
  description: 'Get an organization. Gets information about an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}',
  },
});
