import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksDeleteWebhook = defineTool({
  name: "webhooks:webhooks:delete_webhook",
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
    method: "DELETE",
    path: "/webhooks/{webhook_id}",
  },
});
