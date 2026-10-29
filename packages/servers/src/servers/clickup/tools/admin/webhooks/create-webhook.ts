import { defineTool } from "@usemcpkit/core";

export const adminWebhooksCreateWebhook = defineTool({
  name: "admin:webhooks:create_webhook",
  description:
    "Create Webhook. Set up a webhook to monitor for events.<br> We do not have a dedicated IP address for webhooks. We use our domain name and dynamic addressing.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      endpoint: {
        type: "string",
      },
      events: {
        type: "array",
        description: "See documentation for available event options. Use `*` to subscribe to all events.",
        items: {
          type: "string",
        },
      },
      space_id: {
        type: "integer",
      },
      folder_id: {
        type: "integer",
      },
      list_id: {
        type: "integer",
      },
      task_id: {
        type: "string",
      },
    },
    required: ["team_id", "endpoint", "events"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_id}/webhook",
    body: ["endpoint", "events", "space_id", "folder_id", "list_id", "task_id"],
  },
});
