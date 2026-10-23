import { defineTool } from '@usemcpkit/core';

export const orgsApiInsightsGetUserStats = defineTool({
  name: 'orgs:api_insights:get_user_stats',
  description:
    'Get user stats. Get API usage statistics within an organization for a user broken down by the type of access.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      user_id: {
        type: 'string',
        description: 'The ID of the user to query for stats',
      },
      min_timestamp: {
        type: 'string',
        description:
          'The minimum timestamp to query for stats. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      max_timestamp: {
        type: 'string',
        description:
          'The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort the results by.',
      },
      sort: {
        type: 'string',
        description: 'The property to sort the results by. (comma-separated)',
      },
      actor_name_substring: {
        type: 'string',
        description:
          'Providing a substring will filter results where the actor name contains the substring. This is a case-insensitive search.',
      },
    },
    required: ['org', 'user_id', 'min_timestamp'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/insights/api/user-stats/{user_id}',
    query: ['min_timestamp', 'max_timestamp', 'page', 'per_page', 'direction', 'sort', 'actor_name_substring'],
  },
});
