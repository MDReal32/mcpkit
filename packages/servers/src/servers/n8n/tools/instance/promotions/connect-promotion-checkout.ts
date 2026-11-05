import { defineTool } from "@usemcpkit/core";

export const instancePromotionsConnectPromotionCheckout = defineTool({
  name: "instance:promotions:connect_promotion_checkout",
  description:
    "Connect an environment. Prepares the environment on the instance that handles the request. For a Git provider, this clones the configured branch into local storage. Safe to call repeatedly. Connecting one environment does not make another ready.",
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
    path: "/promotions/environments/{promotionEnvironmentId}/connect",
  },
});
