import { defineTool } from "@usemcpkit/core";

export const collaborationPlansGetPlan = defineTool({
  name: "collaboration:plans:get_plan",
  description: "Get plan. Returns a plan.",
  input: {
    type: "object",
    properties: {
      planId: {
        type: "integer",
        description: "The ID of the plan.",
      },
      useGroupId: {
        type: "boolean",
        default: false,
        description: "Whether to return group IDs instead of group names. Group names are deprecated.",
      },
    },
    required: ["planId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/plans/plan/{planId}",
    query: ["useGroupId"],
  },
});
