import { defineTool } from "@usemcpkit/core";

export const collaborationTeamsInPlanUpdateAtlassianTeam = defineTool({
  name: "collaboration:teams_in_plan:update_atlassian_team",
  description:
    "Update Atlassian team in plan. Updates any of the following planning settings of an Atlassian team in a plan using JSON Patch.",
  input: {
    type: "object",
    properties: {
      planId: {
        type: "integer",
        description: "The ID of the plan.",
      },
      atlassianTeamId: {
        type: "string",
        description: "The ID of the Atlassian team.",
      },
      body: {
        type: "object",
      },
    },
    required: ["planId", "atlassianTeamId", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/plans/plan/{planId}/team/atlassian/{atlassianTeamId}",
    bodyArg: "body",
    contentType: "application/json-patch+json",
  },
});
