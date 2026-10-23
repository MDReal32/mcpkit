import { defineTool } from '@usemcpkit/core';

export const activityListReposStarredByUser = defineTool({
  name: 'activity:list_repos_starred_by_user',
  description: 'List repositories starred by a user. Lists repositories a user has starred.',
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      sort: {
        type: 'string',
        default: 'created',
        enum: ['created', 'updated'],
        description:
          'The property to sort the results by. `created` means when the repository was starred. `updated` means when the repository was last pushed to.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
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
    path: '/users/{username}/starred',
    query: ['sort', 'direction', 'per_page', 'page'],
  },
});
