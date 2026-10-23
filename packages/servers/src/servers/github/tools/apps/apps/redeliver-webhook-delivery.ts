import { defineTool } from "@usemcpkit/core";

export const appsAppsRedeliverWebhookDelivery = defineTool({
  name: "apps:apps:redeliver_webhook_delivery",
  description:
    "Redeliver a delivery for an app webhook. Redeliver a delivery for the webhook configured for a GitHub App.",
  input: {
    type: "object",
    properties: {
      delivery_id: {
        type: "integer",
      },
    },
    required: ["delivery_id"],
  },
  request: {
    method: "POST",
    path: "/app/hook/deliveries/{delivery_id}/attempts",
  },
});
