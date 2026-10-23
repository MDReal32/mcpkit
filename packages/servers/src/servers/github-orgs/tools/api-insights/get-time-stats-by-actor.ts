import { defineTool } from '@usemcpkit/core';

export const apiInsightsGetTimeStatsByActor = defineTool({
  name: 'api_insights:get_time_stats_by_actor',
  description:
    'Get time stats by actor. Get the number of API requests and rate-limited requests made within an organization by a specific actor within a specified time period.',
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
      timestamp_increment: {
        type: 'string',
        description: 'The increment of time used to breakdown the query results (5m, 10m, 1h, etc.)',
      },
    },
    required: ['org', 'actor_type', 'actor_id', 'min_timestamp', 'timestamp_increment'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/insights/api/time-stats/{actor_type}/{actor_id}',
    query: ['min_timestamp', 'max_timestamp', 'timestamp_increment'],
  },
});
