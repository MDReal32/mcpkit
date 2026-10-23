import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemeDraftsUpdateDraftWorkflowMapping = defineTool({
  name: "workflows:workflow_scheme_drafts:update_draft_workflow_mapping",
  description:
    "Set issue types for workflow in workflow scheme. Sets the issue types for a workflow in a workflow scheme's draft. The workflow can also be set as the default workflow for the draft workflow scheme. Unmapped issues types are mapped to the default workflow.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the workflow scheme that the draft belongs to.",
      },
      workflowName: {
        type: "string",
        description: "The name of the workflow.",
      },
      defaultMapping: {
        type: "boolean",
        description: "Whether the workflow is the default workflow for the workflow scheme.",
      },
      issueTypes: {
        type: "array",
        description: "The list of issue type IDs.",
        items: {
          type: "string",
        },
      },
      updateDraftIfNeeded: {
        type: "boolean",
        description:
          "Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new workflow-issue types mapping. Defaults to `false`.",
      },
      workflow: {
        type: "string",
        description: "The name of the workflow. Optional if updating the workflow-issue types mapping.",
      },
    },
    required: ["id", "workflowName"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/workflowscheme/{id}/draft/workflow",
    query: ["workflowName"],
    body: ["defaultMapping", "issueTypes", "updateDraftIfNeeded", "workflow"],
  },
});
