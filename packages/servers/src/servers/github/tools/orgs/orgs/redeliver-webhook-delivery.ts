import { defineTool } from "@usemcpkit/core";

export const orgsOrgsRedeliverWebhookDelivery = defineTool({
  name: "orgs:orgs:redeliver_webhook_delivery",
  description:
    "Redeliver a delivery for an organization webhook. Redeliver a delivery for a webhook configured in an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      hook_id: {
        type: "integer",
        description:
          "The unique identifier of the hook. You can find this value in the `X-GitHub-Hook-ID` header of a webhook delivery.",
      },
      delivery_id: {
        type: "integer",
      },
    },
    required: ["org", "hook_id", "delivery_id"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts",
  },
});
