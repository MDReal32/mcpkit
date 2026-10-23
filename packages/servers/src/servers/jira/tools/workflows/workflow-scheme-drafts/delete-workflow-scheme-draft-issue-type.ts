import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemeDraftsDeleteWorkflowSchemeDraftIssueType = defineTool({
  name: 'workflows:workflow_scheme_drafts:delete_workflow_scheme_draft_issue_type',
  description:
    "Delete workflow for issue type in draft workflow scheme. Deletes the issue type-workflow mapping for an issue type in a workflow scheme's draft.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme that the draft belongs to.',
      },
      issueType: {
        type: 'string',
        description: 'The ID of the issue type.',
      },
    },
    required: ['id', 'issueType'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/workflowscheme/{id}/draft/issuetype/{issueType}',
  },
});
