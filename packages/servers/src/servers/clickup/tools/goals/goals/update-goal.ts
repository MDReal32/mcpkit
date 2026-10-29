import { defineTool } from "@usemcpkit/core";

export const goalsGoalsUpdateGoal = defineTool({
  name: "goals:goals:update_goal",
  description:
    "Update Goal. Rename a Goal, set the due date, replace the description, add or remove owners, and set the Goal color.",
  input: {
    type: "object",
    properties: {
      goal_id: {
        type: "string",
        description: "900e-462d-a849-4a216b06d930 (uuid)",
      },
      name: {
        type: "string",
      },
      due_date: {
        type: "integer",
      },
      description: {
        type: "string",
      },
      rem_owners: {
        type: "array",
        description: "Array of user IDs.",
        items: {
          type: "integer",
        },
      },
      add_owners: {
        type: "array",
        description: "Array of user IDs.",
        items: {
          type: "integer",
        },
      },
      color: {
        type: "string",
      },
    },
    required: ["goal_id", "name", "due_date", "description", "rem_owners", "add_owners", "color"],
  },
  request: {
    method: "PUT",
    path: "/v2/goal/{goal_id}",
    body: ["name", "due_date", "description", "rem_owners", "add_owners", "color"],
  },
});
