import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsTransferWorkflow = defineTool({
  name: "workflows:workflows:transfer_workflow",
  description: "Transfer a workflow to another project. Transfer a workflow to another project.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
      destinationProjectId: {
        type: "string",
      },
    },
    required: ["workflowId", "destinationProjectId"],
  },
  request: {
    method: "PUT",
    path: "/workflows/{workflowId}/transfer",
    body: ["destinationProjectId"],
  },
});
