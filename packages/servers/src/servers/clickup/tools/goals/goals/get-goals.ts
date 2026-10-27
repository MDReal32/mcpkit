import { defineTool } from "@usemcpkit/core";

export const goalsGoalsGetGoals = defineTool({
  name: "goals:goals:get_goals",
  description: "Get Goals. View the Goals available in a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      include_completed: {
        type: "boolean",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/goal",
    query: ["include_completed"],
  },
});
