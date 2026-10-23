import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemeDraftsDeleteDraftDefaultWorkflow = defineTool({
  name: "workflows:workflow_scheme_drafts:delete_draft_default_workflow",
  description:
    "Delete draft default workflow. Resets the default workflow for a workflow scheme's draft. That is, the default workflow is set to Jira's system workflow (the *jira* workflow).",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the workflow scheme that the draft belongs to.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/workflowscheme/{id}/draft/default",
  },
});
