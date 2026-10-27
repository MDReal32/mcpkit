import { defineTool } from "@usemcpkit/core";

export const webhooksMessagesGetWebhookMessage = defineTool({
  name: "webhooks:messages:get_webhook_message",
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
      message_id: {
        type: "string",
      },
      thread_id: {
        type: "string",
      },
    },
    required: ["webhook_id", "webhook_token", "message_id"],
  },
  request: {
    method: "GET",
    path: "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
    query: ["thread_id"],
  },
});
