import { defineTool } from "@usemcpkit/core";

export const orgsApiInsightsGetTimeStats = defineTool({
  name: "orgs:api_insights:get_time_stats",
  description:
    "Get time stats. Get the number of API requests and rate-limited requests made within an organization over a specified time period.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
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
      timestamp_increment: {
        type: "string",
        description: "The increment of time used to breakdown the query results (5m, 10m, 1h, etc.)",
      },
    },
    required: ["org", "min_timestamp", "timestamp_increment"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/insights/api/time-stats",
    query: ["min_timestamp", "max_timestamp", "timestamp_increment"],
  },
});
