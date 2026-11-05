import { defineTool } from "@usemcpkit/core";

export const instancePromotionsDeletePromotionProvider = defineTool({
  name: "instance:promotions:delete_promotion_provider",
  description: "Delete a promotion provider. A provider used by an environment cannot be deleted.",
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
    method: "DELETE",
    path: "/promotions/providers/{promotionProviderId}",
  },
});
