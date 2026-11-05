import { defineTool } from "@usemcpkit/core";

export const instancePromotionsRemoveProjectFromPromotionEnvironment = defineTool({
  name: "instance:promotions:remove_project_from_promotion_environment",
  description: "Unlink a project from a promotion environment",
  input: {
    type: "object",
    properties: {
      promotionEnvironmentId: {
        type: "string",
        description: "The ID of the promotion environment.",
      },
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
    },
    required: ["promotionEnvironmentId", "projectId"],
  },
  request: {
    method: "DELETE",
    path: "/promotions/environments/{promotionEnvironmentId}/projects/{projectId}",
  },
});
