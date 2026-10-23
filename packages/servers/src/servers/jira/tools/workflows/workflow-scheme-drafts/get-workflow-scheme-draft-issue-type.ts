import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemeDraftsGetWorkflowSchemeDraftIssueType = defineTool({
  name: 'workflows:workflow_scheme_drafts:get_workflow_scheme_draft_issue_type',
  description:
    "Get workflow for issue type in draft workflow scheme. Returns the issue type-workflow mapping for an issue type in a workflow scheme's draft.",
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
    method: 'GET',
    path: '/rest/api/2/workflowscheme/{id}/draft/issuetype/{issueType}',
  },
});
