import { defineTool } from "@usemcpkit/core";

export const goalsGoalsDeleteGoal = defineTool({
  name: "goals:goals:delete_goal",
  description: "Delete Goal. Remove a Goal from your Workspace.",
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
    method: "DELETE",
    path: "/v2/goal/{goal_id}",
  },
});
