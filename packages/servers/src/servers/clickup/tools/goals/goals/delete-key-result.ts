import { defineTool } from "@usemcpkit/core";

export const goalsGoalsDeleteKeyResult = defineTool({
  name: "goals:goals:delete_key_result",
  description: "Delete Key Result. Delete a target from a Goal.",
  input: {
    type: "object",
    properties: {
      key_result_id: {
        type: "string",
        description: "8480-49bc-8c57-e569747efe93 (uuid)",
      },
    },
    required: ["key_result_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/key_result/{key_result_id}",
  },
});
