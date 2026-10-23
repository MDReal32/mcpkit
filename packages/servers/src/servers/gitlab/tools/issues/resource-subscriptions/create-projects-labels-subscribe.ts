import { defineTool } from "@usemcpkit/core";

export const issuesResourceSubscriptionsCreateProjectsLabelsSubscribe = defineTool({
  name: "issues:resource_subscriptions:create_projects_labels_subscribe",
  description:
    "Subscribe to a project label. Subscribes the currently authenticated user to a specified project label. They will receive notifications on changes to this item.",
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
    path: "/projects/{id}/labels/{subscribable_id}/subscribe",
  },
});
