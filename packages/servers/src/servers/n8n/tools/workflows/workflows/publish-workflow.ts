import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowsPublishWorkflow = defineTool({
  name: "workflows:workflows:publish_workflow",
  description: "Publish a workflow. Publish a workflow. In n8n v1, this action was termed activating a workflow.",
  input: {
    type: "object",
    properties: {
      workflowId: {
        type: "string",
        description: "The ID of the workflow.",
      },
      versionId: {
        type: "string",
        description: "The specific version ID to publish. If not provided, the latest version is used.",
      },
      name: {
        type: "string",
        description: "Optional name for the workflow version during publication.",
      },
      description: {
        type: "string",
        description: "Optional description for the workflow version during publication.",
      },
    },
    required: ["workflowId"],
  },
  request: {
    method: "POST",
    path: "/workflows/{workflowId}/publish",
    body: ["versionId", "name", "description"],
  },
});
