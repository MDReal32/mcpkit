import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksGetWebhook = defineTool({
  name: "webhooks:webhooks:get_webhook",
  description: "",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
      },
    },
    required: ["webhook_id"],
  },
  request: {
    method: "GET",
    path: "/webhooks/{webhook_id}",
  },
});
