import { defineTool } from "@usemcpkit/core";

export const goalsGoalsCreateKeyResult = defineTool({
  name: "goals:goals:create_key_result",
  description: "Create Key Result. Add a Target to a Goal.",
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
      owners: {
        type: "array",
        items: {
          type: "integer",
        },
      },
      type: {
        type: "string",
        description:
          "Target (key result) types include: `number`, `currency`, `boolean`, `percentage`, or `automatic`.",
      },
      steps_start: {
        type: "integer",
      },
      steps_end: {
        type: "integer",
      },
      unit: {
        type: "string",
      },
      task_ids: {
        type: "array",
        description: "Enter an array of task IDs to link this target with one or more tasks.",
        items: {
          type: "string",
        },
      },
      list_ids: {
        type: "array",
        description: "Enter an array of List IDs to link this target with one or more Lists.",
        items: {
          type: "string",
        },
      },
    },
    required: ["goal_id", "name", "owners", "type", "steps_start", "steps_end", "unit", "task_ids", "list_ids"],
  },
  request: {
    method: "POST",
    path: "/v2/goal/{goal_id}/key_result",
    body: ["name", "owners", "type", "steps_start", "steps_end", "unit", "task_ids", "list_ids"],
  },
});
