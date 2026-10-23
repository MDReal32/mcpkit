import { defineTool } from '@usemcpkit/core';

export const orgsApiInsightsGetSummaryStatsByActor = defineTool({
  name: 'orgs:api_insights:get_summary_stats_by_actor',
  description:
    'Get summary stats by actor. Get overall statistics of API requests within the organization made by a specific actor. Actors can be GitHub App installations, OAuth apps or other tokens on behalf of a user.',
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
    },
    required: ['org', 'actor_type', 'actor_id', 'min_timestamp'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/insights/api/summary-stats/{actor_type}/{actor_id}',
    query: ['min_timestamp', 'max_timestamp'],
  },
});
