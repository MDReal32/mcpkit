import { defineTool } from "@usemcpkit/core";

export const webhooksMessagesGetOriginalWebhookMessage = defineTool({
  name: "webhooks:messages:get_original_webhook_message",
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
      thread_id: {
        type: "string",
      },
    },
    required: ["webhook_id", "webhook_token"],
  },
  request: {
    method: "GET",
    path: "/webhooks/{webhook_id}/{webhook_token}/messages/@original",
    query: ["thread_id"],
  },
});
