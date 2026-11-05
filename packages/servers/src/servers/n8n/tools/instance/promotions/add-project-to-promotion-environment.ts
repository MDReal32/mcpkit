import { defineTool } from "@usemcpkit/core";

export const instancePromotionsAddProjectToPromotionEnvironment = defineTool({
  name: "instance:promotions:add_project_to_promotion_environment",
  description:
    "Link a project to a promotion environment. Links a team project to a project-scoped environment. A project can have one environment for each direction. A direction without a project environment uses the instance environment.",
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
    method: "POST",
    path: "/promotions/environments/{promotionEnvironmentId}/projects/{projectId}",
  },
});
