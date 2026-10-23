import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowSchemesReadWorkflowSchemes = defineTool({
  name: 'workflows:workflow_schemes:read_workflow_schemes',
  description:
    'Bulk get workflow schemes. Returns a list of workflow schemes by providing workflow scheme IDs or project IDs.',
  input: {
    type: 'object',
    properties: {
      projectIds: {
        type: 'array',
        description: 'The list of project IDs to query.',
        items: {
          type: 'string',
          description: 'The list of project IDs to query.',
        },
      },
      workflowSchemeIds: {
        type: 'array',
        description: 'The list of workflow scheme IDs to query.',
        items: {
          type: 'string',
          description: 'The list of workflow scheme IDs to query.',
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/workflowscheme/read',
    body: ['projectIds', 'workflowSchemeIds'],
  },
});
