import { defineTool } from '@usemcpkit/core';

export const reposListForUser = defineTool({
  name: 'repos:list_for_user',
  description: 'List repositories for a user. Lists public repositories for the specified user.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      type: {
        type: 'string',
        default: 'owner',
        enum: ['all', 'owner', 'member'],
        description: 'Limit results to repositories of the specified type.',
      },
      sort: {
        type: 'string',
        default: 'full_name',
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
    required: ['username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/repos',
    query: ['type', 'sort', 'direction', 'per_page', 'page'],
  },
});
