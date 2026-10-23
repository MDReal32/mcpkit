import { defineTool } from '@usemcpkit/core';

export const orgsOrgsListPatGrants = defineTool({
  name: 'orgs:orgs:list_pat_grants',
  description:
    'List fine-grained personal access tokens with access to organization resources. Lists approved fine-grained personal access tokens owned by organization members that can access organization resources.',
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
      sort: {
        type: 'string',
        default: 'created_at',
        enum: ['created_at'],
        description: 'The property by which to sort the results.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      owner: {
        type: 'string',
        description: 'A list of owner usernames to use to filter the results. (comma-separated)',
      },
      repository: {
        type: 'string',
        description: 'The name of the repository to use to filter the results.',
      },
      permission: {
        type: 'string',
        description: 'The permission to use to filter the results.',
      },
      last_used_before: {
        type: 'string',
        description:
          'Only show fine-grained personal access tokens used before the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      last_used_after: {
        type: 'string',
        description:
          'Only show fine-grained personal access tokens used after the given time. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      token_id: {
        type: 'string',
        description: 'The ID of the token (comma-separated)',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/personal-access-tokens',
    query: [
      'per_page',
      'page',
      'sort',
      'direction',
      'owner',
      'repository',
      'permission',
      'last_used_before',
      'last_used_after',
      'token_id',
    ],
  },
});
