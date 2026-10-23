import { defineTool } from "@usemcpkit/core";

export const collaborationPlansTrashPlan = defineTool({
  name: "collaboration:plans:trash_plan",
  description: "Trash plan. Moves a plan to trash.",
  input: {
    type: "object",
    properties: {
      planId: {
        type: "integer",
        description: "The ID of the plan.",
      },
    },
    required: ["planId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/plans/plan/{planId}/trash",
  },
});
