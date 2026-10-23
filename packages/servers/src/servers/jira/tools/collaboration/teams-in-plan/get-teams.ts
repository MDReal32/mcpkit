import { defineTool } from "@usemcpkit/core";

export const collaborationTeamsInPlanGetTeams = defineTool({
  name: "collaboration:teams_in_plan:get_teams",
  description: "Get teams in plan paginated. Returns a paginated list of plan-only and Atlassian teams in a plan.",
  input: {
    type: "object",
    properties: {
      planId: {
        type: "integer",
        description: "The ID of the plan.",
      },
      cursor: {
        type: "string",
        default: "",
        description: "The cursor to start from. If not provided, the first page will be returned.",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description:
          "The maximum number of plan teams to return per page. The maximum value is 50. The default value is 50.",
      },
    },
    required: ["planId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/plans/plan/{planId}/team",
    query: ["cursor", "maxResults"],
  },
});
