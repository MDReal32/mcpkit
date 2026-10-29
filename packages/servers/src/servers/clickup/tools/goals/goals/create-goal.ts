import { defineTool } from "@usemcpkit/core";

export const goalsGoalsCreateGoal = defineTool({
  name: "goals:goals:create_goal",
  description: "Create Goal. Add a new Goal to a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
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
      multiple_owners: {
        type: "boolean",
      },
      owners: {
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
    required: ["team_id", "name", "due_date", "description", "multiple_owners", "owners", "color"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_id}/goal",
    body: ["name", "due_date", "description", "multiple_owners", "owners", "color"],
  },
});
