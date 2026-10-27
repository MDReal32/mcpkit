import { defineTool } from "@usemcpkit/core";

export const adminWebhooksDeleteWebhook = defineTool({
  name: "admin:webhooks:delete_webhook",
  description: "Delete Webhook. Delete a webhook to stop monitoring the events and locations of the webhook.",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
        description: "e506-4a29-9d42-26e504e3435e (uuid)",
      },
    },
    required: ["webhook_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/webhook/{webhook_id}",
  },
});
