import { defineTool } from '@usemcpkit/core';

export const orgsList = defineTool({
  name: 'orgs:list',
  description: 'List organizations. Lists all organizations, in the order that they were created.',
  input: {
    type: 'object',
    properties: {
      since: {
        type: 'integer',
        description: 'An organization ID. Only return organizations with an ID greater than this ID.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/organizations',
    query: ['since', 'per_page'],
  },
});
