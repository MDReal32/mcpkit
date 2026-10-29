import { defineTool } from "@usemcpkit/core";

export const webhooksMessagesDeleteWebhookMessage = defineTool({
  name: "webhooks:messages:delete_webhook_message",
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
    method: "DELETE",
    path: "/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}",
    query: ["thread_id"],
  },
});
