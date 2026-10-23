import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemeDraftsGetDraftWorkflow = defineTool({
  name: 'workflows:workflow_scheme_drafts:get_draft_workflow',
  description:
    "Get issue types for workflows in draft workflow scheme. Returns the workflow-issue type mappings for a workflow scheme's draft.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme that the draft belongs to.',
      },
      workflowName: {
        type: 'string',
        description:
          'The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/workflowscheme/{id}/draft/workflow',
    query: ['workflowName'],
  },
});
