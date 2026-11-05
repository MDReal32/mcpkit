import { defineTool } from "@usemcpkit/core";

export const instancePromotionsDisconnectPromotionCheckout = defineTool({
  name: "instance:promotions:disconnect_promotion_checkout",
  description:
    "Remove an environment's local checkout. Removes the local checkout and keeps the environment, its credentials, and the trusted SSH host keys.",
  input: {
    type: "object",
    properties: {
      promotionEnvironmentId: {
        type: "string",
        description: "The ID of the promotion environment.",
      },
    },
    required: ["promotionEnvironmentId"],
  },
  request: {
    method: "POST",
    path: "/promotions/environments/{promotionEnvironmentId}/disconnect",
  },
});
