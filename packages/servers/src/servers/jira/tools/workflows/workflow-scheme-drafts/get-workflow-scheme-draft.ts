import { defineTool } from "@usemcpkit/core";

export const workflowsWorkflowSchemeDraftsGetWorkflowSchemeDraft = defineTool({
  name: "workflows:workflow_scheme_drafts:get_workflow_scheme_draft",
  description:
    "Get draft workflow scheme. Returns the draft workflow scheme for an active workflow scheme. Draft workflow schemes allow changes to be made to the active workflow schemes: When an active workflow scheme is updated, a draft copy is created. The draft is modified, then the changes in the draft are copied back to the active workflow scheme. See Configuring workflow schemes for more information. Note that:",
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
    method: "GET",
    path: "/rest/api/2/workflowscheme/{id}/draft",
  },
});
