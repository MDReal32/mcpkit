import { defineTool } from "@usemcpkit/core";

export const collaborationTeamsInPlanDeletePlanOnlyTeam = defineTool({
  name: "collaboration:teams_in_plan:delete_plan_only_team",
  description: "Delete plan-only team. Deletes a plan-only team and their planning settings.",
  input: {
    type: "object",
    properties: {
      planId: {
        type: "integer",
        description: "The ID of the plan.",
      },
      planOnlyTeamId: {
        type: "integer",
        description: "The ID of the plan-only team.",
      },
    },
    required: ["planId", "planOnlyTeamId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
  },
});
