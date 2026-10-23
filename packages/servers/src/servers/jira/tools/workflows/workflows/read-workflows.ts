import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowsReadWorkflows = defineTool({
  name: 'workflows:workflows:read_workflows',
  description:
    'Bulk get workflows. Returns a list of workflows and related statuses by providing workflow names, workflow IDs, or project and issue types.',
  input: {
    type: 'object',
    properties: {
      projectAndIssueTypes: {
        type: 'array',
        description: 'The list of projects and issue types to query.',
        items: {
          type: 'object',
          description: 'A project and issueType ID pair that identifies a status mapping.',
          properties: {
            issueTypeId: {
              type: 'string',
              description: 'The ID of the issue type.',
            },
            projectId: {
              type: 'string',
              description: 'The ID of the project.',
            },
          },
          required: ['issueTypeId', 'projectId'],
        },
      },
      workflowIds: {
        type: 'array',
        description: 'The list of workflow IDs to query.',
        items: {
          type: 'string',
          description: 'The list of workflow IDs to query.',
        },
      },
      workflowNames: {
        type: 'array',
        description: 'The list of workflow names to query.',
        items: {
          type: 'string',
          description: 'The list of workflow names to query.',
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/workflows',
    body: ['projectAndIssueTypes', 'workflowIds', 'workflowNames'],
  },
});
