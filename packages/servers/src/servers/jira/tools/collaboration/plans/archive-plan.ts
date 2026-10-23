import { defineTool } from "@usemcpkit/core";

export const collaborationPlansArchivePlan = defineTool({
  name: "collaboration:plans:archive_plan",
  description: "Archive plan. Archives a plan.",
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
    path: "/rest/api/2/plans/plan/{planId}/archive",
  },
});
