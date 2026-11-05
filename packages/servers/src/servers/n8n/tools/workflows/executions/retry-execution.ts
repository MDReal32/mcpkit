import { defineTool } from "@usemcpkit/core";

export const workflowsExecutionsRetryExecution = defineTool({
  name: "workflows:executions:retry_execution",
  description: "Retry an execution. Retry an execution from your instance.",
  input: {
    type: "object",
    properties: {
      executionId: {
        type: "integer",
        description: "The ID of the execution.",
      },
      loadWorkflow: {
        type: "boolean",
        description:
          "Whether to load the currently saved workflow to execute instead of the one saved at the time of the execution. If set to true, it will retry with the latest version of the workflow.",
      },
    },
    required: ["executionId"],
  },
  request: {
    method: "POST",
    path: "/executions/{executionId}/retry",
    body: ["loadWorkflow"],
  },
});
