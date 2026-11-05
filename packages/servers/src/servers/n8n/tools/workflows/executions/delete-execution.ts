import { defineTool } from "@usemcpkit/core";

export const workflowsExecutionsDeleteExecution = defineTool({
  name: "workflows:executions:delete_execution",
  description: "Delete an execution. Deletes an execution from your instance.",
  input: {
    type: "object",
    properties: {
      executionId: {
        type: "integer",
        description: "The ID of the execution.",
      },
    },
    required: ["executionId"],
  },
  request: {
    method: "DELETE",
    path: "/executions/{executionId}",
  },
});
