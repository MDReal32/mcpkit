import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemeDraftsDeleteWorkflowSchemeDraft = defineTool({
  name: "workflows:workflow_scheme_drafts:delete_workflow_scheme_draft",
  description: "Delete draft workflow scheme. Deletes a draft workflow scheme.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the active workflow scheme that the draft was created from.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/workflowscheme/{id}/draft",
  },
});
