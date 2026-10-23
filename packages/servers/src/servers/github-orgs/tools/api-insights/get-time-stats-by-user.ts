import { defineTool } from '@usemcpkit/core';

export const apiInsightsGetTimeStatsByUser = defineTool({
  name: 'api_insights:get_time_stats_by_user',
  description:
    'Get time stats by user. Get the number of API requests and rate-limited requests made within an organization by a specific user over a specified time period.',
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
      timestamp_increment: {
        type: 'string',
        description: 'The increment of time used to breakdown the query results (5m, 10m, 1h, etc.)',
      },
    },
    required: ['org', 'user_id', 'min_timestamp', 'timestamp_increment'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/insights/api/time-stats/users/{user_id}',
    query: ['min_timestamp', 'max_timestamp', 'timestamp_increment'],
  },
});
