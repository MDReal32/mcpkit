import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsDeleteWorkflow = defineTool({
  name: "workflows:workflows:delete_workflow",
  description: "Delete a workflow. Delete a workflow.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
    },
    required: ["workflowId"],
  },
  request: {
    method: "DELETE",
    path: "/workflows/{workflowId}",
  },
});
