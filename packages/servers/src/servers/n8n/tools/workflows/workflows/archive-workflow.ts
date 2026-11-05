import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsArchiveWorkflow = defineTool({
  name: "workflows:workflows:archive_workflow",
  description:
    "Archive a workflow. Soft-deletes a workflow by archiving it. Idempotent: archiving an already archived workflow returns 200 with the current workflow.",
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
    path: "/workflows/{workflowId}/archive",
  },
});
