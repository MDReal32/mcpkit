import { defineTool } from "@usemcpkit/core";

export const instancePromotionsDeletePromotionEnvironment = defineTool({
  name: "instance:promotions:delete_promotion_environment",
  description:
    "Delete a promotion environment. Deletes the environment with its project links and local checkout. Its provider is kept. Nothing in Git changes.",
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
    method: "DELETE",
    path: "/promotions/environments/{promotionEnvironmentId}",
  },
});
