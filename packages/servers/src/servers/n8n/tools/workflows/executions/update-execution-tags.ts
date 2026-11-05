import { defineTool } from "@usemcpkit/core";

export const workflowsExecutionsUpdateExecutionTags = defineTool({
  name: "workflows:executions:update_execution_tags",
  description: "Update tags of an execution. Update annotation tags of an execution.",
  input: {
    type: "object",
    properties: {
      executionId: {
        type: "integer",
        description: "The ID of the execution.",
      },
      body: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
          },
          required: ["id"],
        },
      },
    },
    required: ["executionId", "body"],
  },
  request: {
    method: "PUT",
    path: "/executions/{executionId}/tags",
    bodyArg: "body",
  },
});
