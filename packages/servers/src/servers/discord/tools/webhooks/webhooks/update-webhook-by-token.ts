import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksUpdateWebhookByToken = defineTool({
  name: "webhooks:webhooks:update_webhook_by_token",
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
      name: {
        type: "string",
      },
      avatar: {
        type: "string",
      },
    },
    required: ["webhook_id", "webhook_token"],
  },
  request: {
    method: "PATCH",
    path: "/webhooks/{webhook_id}/{webhook_token}",
    body: ["name", "avatar"],
  },
});
