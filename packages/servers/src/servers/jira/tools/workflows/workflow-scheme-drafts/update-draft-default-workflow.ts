import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemeDraftsUpdateDraftDefaultWorkflow = defineTool({
  name: "workflows:workflow_scheme_drafts:update_draft_default_workflow",
  description: "Update draft default workflow. Sets the default workflow for a workflow scheme's draft.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the workflow scheme that the draft belongs to.",
      },
      updateDraftIfNeeded: {
        type: "boolean",
        description:
          "Whether a draft workflow scheme is created or updated when updating an active workflow scheme. The draft is updated with the new default workflow. Defaults to `false`.",
      },
      workflow: {
        type: "string",
        description: "The name of the workflow to set as the default workflow.",
      },
    },
    required: ["id", "workflow"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/workflowscheme/{id}/draft/default",
    body: ["updateDraftIfNeeded", "workflow"],
  },
});
