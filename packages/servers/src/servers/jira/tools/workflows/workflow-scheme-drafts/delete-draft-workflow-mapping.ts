import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemeDraftsDeleteDraftWorkflowMapping = defineTool({
  name: 'workflows:workflow_scheme_drafts:delete_draft_workflow_mapping',
  description:
    "Delete issue types for workflow in draft workflow scheme. Deletes the workflow-issue type mapping for a workflow in a workflow scheme's draft.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme that the draft belongs to.',
      },
      workflowName: {
        type: 'string',
        description: 'The name of the workflow.',
      },
    },
    required: ['id', 'workflowName'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/workflowscheme/{id}/draft/workflow',
    query: ['workflowName'],
  },
});
