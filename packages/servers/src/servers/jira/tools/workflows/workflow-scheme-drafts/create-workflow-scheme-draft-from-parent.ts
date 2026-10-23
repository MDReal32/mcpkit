import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemeDraftsCreateWorkflowSchemeDraftFromParent = defineTool({
  name: "workflows:workflow_scheme_drafts:create_workflow_scheme_draft_from_parent",
  description:
    "Create draft workflow scheme. Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an active workflow scheme can only have one draft workflow scheme.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the active workflow scheme that the draft is created from.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/workflowscheme/{id}/createdraft",
  },
});
