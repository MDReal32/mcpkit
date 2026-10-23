import { defineTool } from "@usemcpkit/core";

export const copilotCopilotCopilotUsersOneDayUsageMetrics = defineTool({
  name: "copilot:copilot:copilot_users_one_day_usage_metrics",
  description:
    "Get Copilot users usage metrics for a specific day. Use this endpoint to retrieve download links for the Copilot user usage metrics report for a specific day. The report provides detailed user-level usage data and engagement metrics for Copilot features across the enterprise.",
  input: {
    type: "object",
    properties: {
      enterprise: {
        type: "string",
        description: "The slug version of the enterprise name.",
      },
      day: {
        type: "string",
        description: "The day to request data for, in `YYYY-MM-DD` format.",
      },
    },
    required: ["enterprise", "day"],
  },
  request: {
    method: "GET",
    path: "/enterprises/{enterprise}/copilot/metrics/reports/users-1-day",
    query: ["day"],
  },
});
