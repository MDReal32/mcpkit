import { defineTool } from "@usemcpkit/core";

export const orgsApiInsightsGetSummaryStatsByUser = defineTool({
  name: "orgs:api_insights:get_summary_stats_by_user",
  description: "Get summary stats by user. Get overall statistics of API requests within the organization for a user.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      user_id: {
        type: "string",
        description: "The ID of the user to query for stats",
      },
      min_timestamp: {
        type: "string",
        description:
          "The minimum timestamp to query for stats. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
      },
      max_timestamp: {
        type: "string",
        description:
          "The maximum timestamp to query for stats. Defaults to the time 30 days ago. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.",
      },
    },
    required: ["org", "user_id", "min_timestamp"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/insights/api/summary-stats/users/{user_id}",
    query: ["min_timestamp", "max_timestamp"],
  },
});
