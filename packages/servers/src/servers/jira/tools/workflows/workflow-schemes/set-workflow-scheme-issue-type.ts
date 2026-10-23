import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemesSetWorkflowSchemeIssueType = defineTool({
  name: 'workflows:workflow_schemes:set_workflow_scheme_issue_type',
  description:
    'Set workflow for issue type in workflow scheme. Sets the workflow for an issue type in a workflow scheme.',
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
      body_issueType: {
        type: 'string',
        description: 'The ID of the issue type. Not required if updating the issue type-workflow mapping.',
      },
      updateDraftIfNeeded: {
        type: 'boolean',
        description:
          'Set to true to create or update the draft of a workflow scheme and update the mapping in the draft, when the workflow scheme cannot be edited. Defaults to `false`. Only applicable when updating the workflow-issue types mapping.',
      },
      workflow: {
        type: 'string',
        description: 'The name of the workflow.',
      },
    },
    required: ['id', 'issueType'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/workflowscheme/{id}/issuetype/{issueType}',
    body: {
      issueType: 'body_issueType',
      updateDraftIfNeeded: 'updateDraftIfNeeded',
      workflow: 'workflow',
    },
  },
});
