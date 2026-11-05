import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsUpdateWorkflowTags = defineTool({
  name: "workflows:workflows:update_workflow_tags",
  description: "Update tags of a workflow. Update tags of a workflow.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
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
    required: ["workflowId", "body"],
  },
  request: {
    method: "PUT",
    path: "/workflows/{workflowId}/tags",
    bodyArg: "body",
  },
});
