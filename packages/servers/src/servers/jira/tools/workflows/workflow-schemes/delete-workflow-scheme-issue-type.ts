import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemesDeleteWorkflowSchemeIssueType = defineTool({
  name: 'workflows:workflow_schemes:delete_workflow_scheme_issue_type',
  description:
    'Delete workflow for issue type in workflow scheme. Deletes the issue type-workflow mapping for an issue type in a workflow scheme.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme.',
      },
      issueType: {
        type: 'string',
        description: 'The ID of the issue type.',
      },
      updateDraftIfNeeded: {
        type: 'boolean',
        default: false,
        description:
          'Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`.',
      },
    },
    required: ['id', 'issueType'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/workflowscheme/{id}/issuetype/{issueType}',
    query: ['updateDraftIfNeeded'],
  },
});
