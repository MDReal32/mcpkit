import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsDeleteInactiveWorkflow = defineTool({
  name: "workflows:workflows:delete_inactive_workflow",
  description: "Delete inactive workflow. Deletes a workflow.",
  input: {
    type: "object",
    properties: {
      entityId: {
        type: "string",
        description: "The entity ID of the workflow.",
      },
    },
    required: ["entityId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/workflow/{entityId}",
  },
});
