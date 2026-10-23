import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemesDeleteWorkflowMapping = defineTool({
  name: 'workflows:workflow_schemes:delete_workflow_mapping',
  description:
    'Delete issue types for workflow in workflow scheme. Deletes the workflow-issue type mapping for a workflow in a workflow scheme.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme.',
      },
      workflowName: {
        type: 'string',
        description: 'The name of the workflow.',
      },
      updateDraftIfNeeded: {
        type: 'boolean',
        default: false,
        description:
          'Set to true to create or update the draft of a workflow scheme and delete the mapping from the draft, when the workflow scheme cannot be edited. Defaults to `false`.',
      },
    },
    required: ['id', 'workflowName'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/workflowscheme/{id}/workflow',
    query: ['workflowName', 'updateDraftIfNeeded'],
  },
});
