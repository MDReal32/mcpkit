import { defineTool } from '@usemcpkit/core';

export const apiInsightsGetRouteStatsByActor = defineTool({
  name: 'api_insights:get_route_stats_by_actor',
  description:
    'Get route stats by actor. Get API request count statistics for an actor broken down by route within a specified time frame.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      actor_type: {
        type: 'string',
        enum: ['installation', 'classic_pat', 'fine_grained_pat', 'oauth_app', 'github_app_user_to_server'],
        description: 'The type of the actor',
      },
      actor_id: {
        type: 'integer',
        description: 'The ID of the actor',
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
      api_route_substring: {
        type: 'string',
        description:
          'Providing a substring will filter results where the API route contains the substring. This is a case-insensitive search.',
      },
    },
    required: ['org', 'actor_type', 'actor_id', 'min_timestamp'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/insights/api/route-stats/{actor_type}/{actor_id}',
    query: ['min_timestamp', 'max_timestamp', 'page', 'per_page', 'direction', 'sort', 'api_route_substring'],
  },
});
