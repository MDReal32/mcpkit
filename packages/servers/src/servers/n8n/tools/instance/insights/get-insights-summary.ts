import { defineTool } from "@usemcpkit/core";

export const instanceInsightsGetInsightsSummary = defineTool({
  name: "instance:insights:get_insights_summary",
  description: "Retrieve insights summary. Retrieve the insights summary for the selected date range.",
  input: {
    type: "object",
    properties: {
      startDate: {
        type: "string",
        description: "ISO 8601 start date. Defaults to 7 days ago.",
      },
      endDate: {
        type: "string",
        description: "ISO 8601 end date. Defaults to now.",
      },
      projectId: {
        type: "string",
        description: "Project identifier to filter insights by project.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/insights/summary",
    query: ["startDate", "endDate", "projectId"],
  },
});
