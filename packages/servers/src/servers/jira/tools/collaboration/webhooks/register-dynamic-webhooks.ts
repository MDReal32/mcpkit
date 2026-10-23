import { defineTool } from "@usemcpkit/core";

export const collaborationWebhooksRegisterDynamicWebhooks = defineTool({
  name: "collaboration:webhooks:register_dynamic_webhooks",
  description: "Register dynamic webhooks. Registers webhooks.",
  input: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description:
          "The URL that specifies where to send the webhooks. This URL must use the same base URL as the Connect app. Only a single URL per app is allowed to be registered.",
      },
      webhooks: {
        type: "array",
        description: "A list of webhooks.",
        items: {
          type: "object",
          description: "A list of webhooks.",
          properties: {
            events: {
              type: "array",
              description: "The Jira events that trigger the webhook.",
              items: {
                type: "string",
                enum: [
                  "jira:issue_created",
                  "jira:issue_updated",
                  "jira:issue_deleted",
                  "comment_created",
                  "comment_updated",
                  "comment_deleted",
                  "issue_property_set",
                  "issue_property_deleted",
                  "sprint_created",
                  "sprint_updated",
                  "sprint_closed",
                  "sprint_deleted",
                  "sprint_started",
                  "jira:version_released",
                  "jira:version_unreleased",
                  "jira:version_created",
                  "jira:version_moved",
                  "jira:version_updated",
                  "jira:version_merged",
                  "jira:version_deleted",
                ],
              },
            },
            fieldIdsFilter: {
              type: "array",
              description:
                "A list of field IDs. When the issue changelog contains any of the fields, the webhook `jira:issue_updated` is sent. If this parameter is not present, the app is notified about all field updates.",
              items: {
                type: "string",
                description:
                  "A list of field IDs. When the issue changelog contains any of the fields, the webhook <code>jira:issue_updated</code> is sent. If this parameter is not present, the app is notified about all field updates.",
              },
            },
            issuePropertyKeysFilter: {
              type: "array",
              description:
                "A list of issue property keys. A change of those issue properties triggers the `issue_property_set` or `issue_property_deleted` webhooks. If this parameter is not present, the app is notified about all issue property updates.",
              items: {
                type: "string",
                description:
                  "A list of issue property keys. A change of those issue properties triggers the <code>issue_property_set</code> or <code>issue_property_deleted</code> webhooks. If this parameter is not present, the app is notified about all issue property updates.",
              },
            },
            jqlFilter: {
              type: "string",
              description:
                "The JQL filter that specifies which issues the webhook is sent for. Only a subset of JQL can be used. The supported elements are:",
            },
          },
          required: ["events", "jqlFilter"],
        },
      },
    },
    required: ["url", "webhooks"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/webhook",
    body: ["url", "webhooks"],
  },
});
