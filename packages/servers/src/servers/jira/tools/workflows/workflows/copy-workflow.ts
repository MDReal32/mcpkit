import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsCopyWorkflow = defineTool({
  name: "workflows:workflows:copy_workflow",
  description:
    "Copy workflow. Copies an existing workflow, and the statuses it uses, into a new workflow with the given name. The copy is created in the same scope as the workflow it is copied from. If no description is provided, the copy is created with an empty description.",
  input: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "The description of the new workflow to create. Defaults to an empty description.",
      },
      workflowId: {
        type: "string",
        description: "The ID of the workflow to copy.",
      },
      workflowName: {
        type: "string",
        description: "The name of the new workflow to create.",
      },
    },
    required: ["workflowId", "workflowName"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflows/copy",
    body: ["description", "workflowId", "workflowName"],
  },
});
