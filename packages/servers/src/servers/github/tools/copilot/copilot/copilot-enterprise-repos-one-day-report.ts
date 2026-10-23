import { defineTool } from "@usemcpkit/core";

export const copilotCopilotCopilotEnterpriseReposOneDayReport = defineTool({
  name: "copilot:copilot:copilot_enterprise_repos_one_day_report",
  description:
    "Get Copilot enterprise repository report for a specific day. Use this endpoint to retrieve download links for the Copilot enterprise repository report for a specific day. The report provides per-repository pull request metrics for Copilot across the enterprise, with one entry per repository.",
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
    path: "/enterprises/{enterprise}/copilot/metrics/reports/repos-1-day",
    query: ["day"],
  },
});
