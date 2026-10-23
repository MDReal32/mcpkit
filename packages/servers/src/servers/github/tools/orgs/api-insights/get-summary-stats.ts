import { defineTool } from "@usemcpkit/core";

export const orgsApiInsightsGetSummaryStats = defineTool({
  name: "orgs:api_insights:get_summary_stats",
  description:
    "Get summary stats. Get overall statistics of API requests made within an organization by all users and apps within a specified time frame.",
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
    },
    required: ["org", "min_timestamp"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/insights/api/summary-stats",
    query: ["min_timestamp", "max_timestamp"],
  },
});
