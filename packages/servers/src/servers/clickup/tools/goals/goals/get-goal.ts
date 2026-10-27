import { defineTool } from "@usemcpkit/core";

export const goalsGoalsGetGoal = defineTool({
  name: "goals:goals:get_goal",
  description: "Get Goal. View the details of a Goal including its Targets.",
  input: {
    type: "object",
    properties: {
      goal_id: {
        type: "string",
        description: "900e-462d-a849-4a216b06d930 (uuid)",
      },
    },
    required: ["goal_id"],
  },
  request: {
    method: "GET",
    path: "/v2/goal/{goal_id}",
  },
});
