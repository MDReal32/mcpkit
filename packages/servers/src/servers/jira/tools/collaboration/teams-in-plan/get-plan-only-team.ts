import { defineTool } from "@usemcpkit/core";

export const collaborationTeamsInPlanGetPlanOnlyTeam = defineTool({
  name: "collaboration:teams_in_plan:get_plan_only_team",
  description: "Get plan-only team. Returns planning settings for a plan-only team.",
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
    method: "GET",
    path: "/rest/api/2/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
  },
});
