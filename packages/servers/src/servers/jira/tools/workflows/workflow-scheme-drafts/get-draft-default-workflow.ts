import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemeDraftsGetDraftDefaultWorkflow = defineTool({
  name: 'workflows:workflow_scheme_drafts:get_draft_default_workflow',
  description:
    "Get draft default workflow. Returns the default workflow for a workflow scheme's draft. The default workflow is the workflow that is assigned any issue types that have not been mapped to any other workflow. The default workflow has *All Unassigned Issue Types* listed in its issue types for the workflow scheme in Jira.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme that the draft belongs to.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/workflowscheme/{id}/draft/default',
  },
});
