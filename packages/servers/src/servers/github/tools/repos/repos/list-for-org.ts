import { defineTool } from '@usemcpkit/core';

export const reposReposListForOrg = defineTool({
  name: 'repos:repos:list_for_org',
  description: 'List organization repositories. Lists repositories for the specified organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      type: {
        type: 'string',
        default: 'all',
        enum: ['all', 'public', 'private', 'forks', 'sources', 'member'],
        description: 'Specifies the types of repositories you want returned.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated', 'pushed', 'full_name'],
        description: 'The property to sort the results by.',
      },
      direction: {
        type: 'string',
        enum: ['asc', 'desc'],
        description: 'The order to sort by. Default: `asc` when using `full_name`, otherwise `desc`.',
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
    path: '/orgs/{org}/repos',
    query: ['type', 'sort', 'direction', 'per_page', 'page'],
  },
});
