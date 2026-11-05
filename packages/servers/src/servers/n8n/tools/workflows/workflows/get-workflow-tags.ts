import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsGetWorkflowTags = defineTool({
  name: "workflows:workflows:get_workflow_tags",
  description: "Get workflow tags. Get workflow tags.",
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
    method: "GET",
    path: "/workflows/{workflowId}/tags",
  },
});
