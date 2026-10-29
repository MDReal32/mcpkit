import { defineTool } from "@usemcpkit/core";

export const applicationsSkusGetSkuSubscriptions = defineTool({
  name: "applications:skus:get_sku_subscriptions",
  description: ". Returns all subscriptions containing the SKU, filtered by user.",
  input: {
    type: "object",
    properties: {
      sku_id: {
        type: "string",
      },
      before: {
        type: "string",
      },
      after: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      user_id: {
        type: "string",
      },
    },
    required: ["sku_id"],
  },
  request: {
    method: "GET",
    path: "/skus/{sku_id}/subscriptions",
    query: ["before", "after", "limit", "user_id"],
  },
});
