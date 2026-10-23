import { defineTool } from '@usemcpkit/core';

export const orgsOrgsListPublicMembers = defineTool({
  name: 'orgs:orgs:list_public_members',
  description:
    'List public organization members. Members of an organization can choose to have their membership publicized or not.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/public_members',
    query: ['per_page', 'page'],
  },
});
