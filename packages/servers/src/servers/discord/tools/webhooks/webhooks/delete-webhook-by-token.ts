import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksDeleteWebhookByToken = defineTool({
  name: "webhooks:webhooks:delete_webhook_by_token",
  description: "",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
      },
      webhook_token: {
        type: "string",
      },
    },
    required: ["webhook_id", "webhook_token"],
  },
  request: {
    method: "DELETE",
    path: "/webhooks/{webhook_id}/{webhook_token}",
  },
});
