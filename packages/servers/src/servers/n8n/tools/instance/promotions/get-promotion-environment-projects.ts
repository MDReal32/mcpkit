import { defineTool } from "@usemcpkit/core";

export const instancePromotionsGetPromotionEnvironmentProjects = defineTool({
  name: "instance:promotions:get_promotion_environment_projects",
  description: "List projects linked to a promotion environment",
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
    path: "/promotions/environments/{promotionEnvironmentId}/projects",
  },
});
