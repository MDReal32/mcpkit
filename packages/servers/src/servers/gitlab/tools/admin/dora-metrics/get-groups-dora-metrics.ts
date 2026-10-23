import { defineTool } from "@usemcpkit/core";

export const adminDoraMetricsGetGroupsDoraMetrics = defineTool({
  name: "admin:dora_metrics:get_groups_dora_metrics",
  description: "Retrieve group-level DORA metrics. Retrieves DORA metrics for a specified group.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      metric: {
        type: "string",
        enum: ["deployment_frequency", "lead_time_for_changes", "time_to_restore_service", "change_failure_rate"],
        description: "The DORA metric to fetch.",
      },
      start_date: {
        type: "string",
        description: "Start date of the date range. Defaults to 3 months ago.",
      },
      end_date: {
        type: "string",
        description: "End date of the date range. Defaults to the current date.",
      },
      interval: {
        type: "string",
        default: "daily",
        enum: ["all", "monthly", "daily"],
        description: "The bucketing interval.",
      },
      environment_tiers: {
        type: "string",
        description: "The tiers of the environments. (comma-separated)",
      },
    },
    required: ["id", "metric"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/dora/metrics",
    query: ["metric", "start_date", "end_date", "interval", "environment_tiers"],
  },
});
