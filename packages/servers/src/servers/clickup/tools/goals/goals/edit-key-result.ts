import { defineTool } from "@usemcpkit/core";

export const goalsGoalsEditKeyResult = defineTool({
  name: "goals:goals:edit_key_result",
  description: "Edit Key Result. Update a Target.",
  input: {
    type: "object",
    properties: {
      key_result_id: {
        type: "string",
        description: "8480-49bc-8c57-e569747efe93 (uuid)",
      },
      steps_current: {
        type: "integer",
      },
      note: {
        type: "string",
      },
    },
    required: ["key_result_id", "steps_current", "note"],
  },
  request: {
    method: "PUT",
    path: "/v2/key_result/{key_result_id}",
    body: ["steps_current", "note"],
  },
});
