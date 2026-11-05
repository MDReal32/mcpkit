import { defineTool } from "@usemcpkit/core";

export const instancePromotionsGetPromotionProvider = defineTool({
  name: "instance:promotions:get_promotion_provider",
  description:
    "Retrieve a promotion provider. Returns the provider with its public configuration. Secrets are never returned.",
  input: {
    type: "object",
    properties: {
      promotionProviderId: {
        type: "string",
        description: "The ID of the promotion provider.",
      },
    },
    required: ["promotionProviderId"],
  },
  request: {
    method: "GET",
    path: "/promotions/providers/{promotionProviderId}",
  },
});
