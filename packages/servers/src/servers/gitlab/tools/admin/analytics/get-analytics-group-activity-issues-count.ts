import { defineTool } from "@usemcpkit/core";

export const adminAnalyticsGetAnalyticsGroupActivityIssuesCount = defineTool({
  name: "admin:analytics:get_analytics_group_activity_issues_count",
  description:
    "Retrieve count of recently created issues for a group. Retrieves the count of recently created issues for a specified group.",
  input: {
    type: "object",
    properties: {
      group_path: {
        type: "string",
        description: "Group path.",
      },
    },
    required: ["group_path"],
  },
  request: {
    method: "GET",
    path: "/analytics/group_activity/issues_count",
    query: ["group_path"],
  },
});
