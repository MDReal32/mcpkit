import { defineTool } from "@usemcpkit/core";

export const applicationsSkusGetSkuSubscription = defineTool({
  name: "applications:skus:get_sku_subscription",
  description: ". Get a subscription by its ID.",
  input: {
    type: "object",
    properties: {
      sku_id: {
        type: "string",
      },
      subscription_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
    },
    required: ["sku_id", "subscription_id"],
  },
  request: {
    method: "GET",
    path: "/skus/{sku_id}/subscriptions/{subscription_id}",
    query: ["user_id"],
  },
});
