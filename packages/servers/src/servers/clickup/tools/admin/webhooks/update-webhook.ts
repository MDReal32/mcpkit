import { defineTool } from "@usemcpkit/core";

export const adminWebhooksUpdateWebhook = defineTool({
  name: "admin:webhooks:update_webhook",
  description: "Update Webhook. Update a webhook to change the events to be monitored.",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
        description: "e506-4a29-9d42-26e504e3435e (uuid)",
      },
      endpoint: {
        type: "string",
      },
      events: {
        type: "string",
      },
      status: {
        type: "string",
      },
    },
    required: ["webhook_id", "endpoint", "events", "status"],
  },
  request: {
    method: "PUT",
    path: "/v2/webhook/{webhook_id}",
    body: ["endpoint", "events", "status"],
  },
});
