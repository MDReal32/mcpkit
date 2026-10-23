import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemesGetWorkflow = defineTool({
  name: 'workflows:workflow_schemes:get_workflow',
  description:
    'Get issue types for workflows in workflow scheme. Returns the workflow-issue type mappings for a workflow scheme.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the workflow scheme.',
      },
      workflowName: {
        type: 'string',
        description:
          'The name of a workflow in the scheme. Limits the results to the workflow-issue type mapping for the specified workflow.',
      },
      returnDraftIfExists: {
        type: 'boolean',
        default: false,
        description:
          "Returns the mapping from the workflow scheme's draft rather than the workflow scheme, if set to true. If no draft exists, the mapping from the workflow scheme is returned.",
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/workflowscheme/{id}/workflow',
    query: ['workflowName', 'returnDraftIfExists'],
  },
});
