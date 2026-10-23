import { defineTool } from "@usemcpkit/core";

export const issuesResourceSubscriptionsCreateProjectsMergeRequestsSubscribe = defineTool({
  name: "issues:resource_subscriptions:create_projects_merge_requests_subscribe",
  description:
    "Subscribe to a merge request. Subscribes the currently authenticated user to a specified merge request. They will receive notifications on changes to this item.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      subscribable_id: {
        type: "string",
        description: "Internal ID of the issue or merge request, or ID or title of the label.",
      },
    },
    required: ["id", "subscribable_id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests/{subscribable_id}/subscribe",
  },
});
