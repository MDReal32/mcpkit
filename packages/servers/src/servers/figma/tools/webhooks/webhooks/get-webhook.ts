import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksGetWebhook = defineTool({
  name: "webhooks:webhooks:get_webhook",
  description: "Get a webhook. Get a webhook by ID.",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
        description: "ID of webhook to get",
      },
    },
    required: ["webhook_id"],
  },
  request: {
    method: "GET",
    path: "/v2/webhooks/{webhook_id}",
  },
});
