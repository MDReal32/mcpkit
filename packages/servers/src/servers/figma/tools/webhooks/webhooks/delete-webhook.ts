import { defineTool } from "@usemcpkit/core";

export const webhooksWebhooksDeleteWebhook = defineTool({
  name: "webhooks:webhooks:delete_webhook",
  description: "Delete a webhook. Deletes the specified webhook. This operation cannot be reversed.",
  input: {
    type: "object",
    properties: {
      webhook_id: {
        type: "string",
        description: "ID of webhook to delete",
      },
    },
    required: ["webhook_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/webhooks/{webhook_id}",
  },
});
