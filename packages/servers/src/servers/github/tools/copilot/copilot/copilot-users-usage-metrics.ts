import { defineTool } from "@usemcpkit/core";

export const copilotCopilotCopilotUsersUsageMetrics = defineTool({
  name: "copilot:copilot:copilot_users_usage_metrics",
  description:
    "Get Copilot users usage metrics. Use this endpoint to retrieve download links for the latest 28-day enterprise users Copilot usage metrics report. The report provides detailed user-level usage data and engagement metrics for Copilot features across the enterprise.",
  input: {
    type: "object",
    properties: {
      enterprise: {
        type: "string",
        description: "The slug version of the enterprise name.",
      },
    },
    required: ["enterprise"],
  },
  request: {
    method: "GET",
    path: "/enterprises/{enterprise}/copilot/metrics/reports/users-28-day/latest",
  },
});
