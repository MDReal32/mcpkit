import { defineTool } from "@usemcpkit/core";

export const collaborationTeamsInPlanUpdatePlanOnlyTeam = defineTool({
  name: "collaboration:teams_in_plan:update_plan_only_team",
  description:
    "Update plan-only team. Updates any of the following planning settings of a plan-only team using JSON Patch.",
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
      body: {
        type: "object",
      },
    },
    required: ["planId", "planOnlyTeamId", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/plans/plan/{planId}/team/planonly/{planOnlyTeamId}",
    bodyArg: "body",
    contentType: "application/json-patch+json",
  },
});
