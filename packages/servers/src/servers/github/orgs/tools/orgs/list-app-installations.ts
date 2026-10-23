import { defineTool } from '@usemcpkit/core';

export const orgsListAppInstallations = defineTool({
  name: 'orgs:list_app_installations',
  description:
    'List app installations for an organization. Lists all GitHub Apps in an organization. The installation count includes all GitHub Apps installed on repositories in the organization.',
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
    path: '/orgs/{org}/installations',
    query: ['per_page', 'page'],
  },
});
