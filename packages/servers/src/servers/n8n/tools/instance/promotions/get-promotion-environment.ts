import { defineTool } from "@usemcpkit/core";

export const instancePromotionsGetPromotionEnvironment = defineTool({
  name: "instance:promotions:get_promotion_environment",
  description:
    "Retrieve a promotion environment. Returns the environment with its provider summary and the state of its local checkout.",
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
    method: "GET",
    path: "/promotions/environments/{promotionEnvironmentId}",
  },
});
