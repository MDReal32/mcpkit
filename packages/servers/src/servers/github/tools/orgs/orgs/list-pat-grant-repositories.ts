import { defineTool } from '@usemcpkit/core';

export const orgsOrgsListPatGrantRepositories = defineTool({
  name: 'orgs:orgs:list_pat_grant_repositories',
  description:
    'List repositories a fine-grained personal access token has access to. Lists the repositories a fine-grained personal access token has access to.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      pat_id: {
        type: 'integer',
        description: 'Unique identifier of the fine-grained personal access token.',
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
    required: ['org', 'pat_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/personal-access-tokens/{pat_id}/repositories',
    query: ['per_page', 'page'],
  },
});
