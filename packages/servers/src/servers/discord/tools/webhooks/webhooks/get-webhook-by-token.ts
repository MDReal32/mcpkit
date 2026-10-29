import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksGetWebhookByToken = defineTool({
  name: "webhooks:webhooks:get_webhook_by_token",
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
    method: "GET",
    path: "/webhooks/{webhook_id}/{webhook_token}",
  },
});
