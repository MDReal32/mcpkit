import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemesDeleteDefaultWorkflow = defineTool({
  name: 'workflows:workflow_schemes:delete_default_workflow',
  description:
    "Delete default workflow. Resets the default workflow for a workflow scheme. That is, the default workflow is set to Jira's system workflow (the *jira* workflow).",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme.',
      },
      updateDraftIfNeeded: {
        type: 'boolean',
        description:
          'Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the workflow scheme cannot be edited. Defaults to `false`.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/workflowscheme/{id}/default',
    query: ['updateDraftIfNeeded'],
  },
});
