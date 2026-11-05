import { defineTool } from "@usemcpkit/core";

export const workflowsExecutionsGetExecutionTags = defineTool({
  name: "workflows:executions:get_execution_tags",
  description: "Get execution tags. Get annotation tags for an execution.",
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
    method: "GET",
    path: "/executions/{executionId}/tags",
  },
});
