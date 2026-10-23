import { defineTool } from '@usemcpkit/core';

export const codespacesListInOrganization = defineTool({
  name: 'codespaces:list_in_organization',
  description: 'List codespaces for the organization. Lists the codespaces associated to a specified organization.',
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
    path: '/orgs/{org}/codespaces',
    query: ['per_page', 'page'],
  },
});
