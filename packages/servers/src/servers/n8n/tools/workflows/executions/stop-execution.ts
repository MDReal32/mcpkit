import { defineTool } from "@usemcpkit/core";

export const workflowsExecutionsStopExecution = defineTool({
  name: "workflows:executions:stop_execution",
  description: "Stop an execution. Stop an execution by id.",
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
    method: "POST",
    path: "/executions/{executionId}/stop",
  },
});
