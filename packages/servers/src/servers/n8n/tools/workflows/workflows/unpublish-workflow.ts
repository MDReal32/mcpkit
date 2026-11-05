import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsUnpublishWorkflow = defineTool({
  name: "workflows:workflows:unpublish_workflow",
  description: "Unpublish a workflow. Unpublish a workflow. In n8n v1, this action was termed deactivating a workflow.",
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
    method: "POST",
    path: "/workflows/{workflowId}/unpublish",
  },
});
