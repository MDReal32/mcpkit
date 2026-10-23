import { defineTool } from "@usemcpkit/core";

export const workflowsPrioritySchemesDeletePriorityScheme = defineTool({
  name: "workflows:priority_schemes:delete_priority_scheme",
  description: "Delete priority scheme. Deletes a priority scheme.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "integer",
        description: "The priority scheme ID.",
      },
    },
    required: ["schemeId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/priorityscheme/{schemeId}",
  },
});
