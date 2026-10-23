import { defineTool } from "@usemcpkit/core";

export const copilotCopilotCopilotOrganizationOneDayUsageMetrics = defineTool({
  name: "copilot:copilot:copilot_organization_one_day_usage_metrics",
  description:
    "Get Copilot organization usage metrics for a specific day. Use this endpoint to retrieve download links for the Copilot organization usage metrics report for a specific day. The report provides comprehensive usage data for Copilot features across the organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      day: {
        type: "string",
        description: "The day to request data for, in `YYYY-MM-DD` format.",
      },
    },
    required: ["org", "day"],
  },
  request: {
    method: "GET",
    path: "/orgs/{org}/copilot/metrics/reports/organization-1-day",
    query: ["day"],
  },
});
