import { defineTool } from "@usemcpkit/core";

export const workflowsIssuePrioritiesDeletePriority = defineTool({
  name: "workflows:issue_priorities:delete_priority",
  description: "Delete priority. Deletes an issue priority.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue priority.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/priority/{id}",
  },
});
