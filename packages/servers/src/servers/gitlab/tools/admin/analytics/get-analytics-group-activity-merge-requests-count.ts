import { defineTool } from "@usemcpkit/core";

export const adminAnalyticsGetAnalyticsGroupActivityMergeRequestsCount = defineTool({
  name: "admin:analytics:get_analytics_group_activity_merge_requests_count",
  description:
    "Retrieve count of recently created merge requests for a group. Retrieves the count of recently created merge requests for a specified group.",
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
    path: "/analytics/group_activity/merge_requests_count",
    query: ["group_path"],
  },
});
