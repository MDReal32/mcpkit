import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowsWorkflowCapabilities = defineTool({
  name: 'workflows:workflows:workflow_capabilities',
  description:
    'Get available workflow capabilities. Get the list of workflow capabilities for a specific workflow using either the workflow ID, or the project and issue type ID pair. The response includes the scope of the workflow, defined as global/project-based, and a list of project types that the workflow is scoped to. It also includes all rules organised into their broad categories (conditions, validators, actions, triggers, screens) as well…',
  input: {
    type: 'object',
    properties: {
      workflowId: {
        type: 'string',
      },
      projectId: {
        type: 'string',
      },
      issueTypeId: {
        type: 'string',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/workflows/capabilities',
    query: ['workflowId', 'projectId', 'issueTypeId'],
  },
});
