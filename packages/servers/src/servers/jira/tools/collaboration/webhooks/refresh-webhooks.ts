import { defineTool } from "@usemcpkit/core";

export const collaborationWebhooksRefreshWebhooks = defineTool({
  name: "collaboration:webhooks:refresh_webhooks",
  description:
    "Extend webhook life. Extends the life of webhook. Webhooks registered through the REST API expire after 30 days. Call this operation to keep them alive.",
  input: {
    type: "object",
    properties: {
      webhookIds: {
        type: "array",
        description: "A list of webhook IDs.",
        items: {
          type: "integer",
          description: "A list of webhook IDs.",
        },
      },
    },
    required: ["webhookIds"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/webhook/refresh",
    body: ["webhookIds"],
  },
});
