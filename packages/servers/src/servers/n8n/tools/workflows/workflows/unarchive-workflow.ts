import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsUnarchiveWorkflow = defineTool({
  name: "workflows:workflows:unarchive_workflow",
  description: "Unarchive a workflow. Restores an archived workflow.",
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
    path: "/workflows/{workflowId}/unarchive",
  },
});
