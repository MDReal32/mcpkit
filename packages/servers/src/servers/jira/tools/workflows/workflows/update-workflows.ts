import { defineTool } from '@usemcpkit/core';

export const workflowsWorkflowsUpdateWorkflows = defineTool({
  name: 'workflows:workflows:update_workflows',
  description: 'Bulk update workflows. Update workflows and related statuses.',
  input: {
    type: 'object',
    properties: {
      statuses: {
        type: 'array',
        description: 'The statuses to associate with the workflows.',
        items: {
          type: 'object',
          description: 'Details of the status being updated.',
          properties: {
            description: {
              type: 'string',
              description: 'The description of the status.',
            },
            id: {
              type: 'string',
              description: 'The ID of the status. When reusing an existing status, this field should be provided.',
            },
            name: {
              type: 'string',
              description: 'The name of the status.',
            },
            statusCategory: {
              type: 'string',
              description: 'The category of the status.',
              enum: ['TODO', 'IN_PROGRESS', 'DONE'],
            },
            statusReference: {
              type: 'string',
              description:
                'The reference of the status. If adding a new status to a team-managed workflow, this must be a UUID (for company-managed a UUID is not needed).',
            },
          },
          required: ['name', 'statusCategory', 'statusReference'],
        },
      },
      workflows: {
        type: 'array',
        description: 'The details of the workflows to update.',
        items: {
          type: 'object',
          description: 'The details of the workflows to update.',
          properties: {
            defaultStatusMappings: {
              type: 'array',
              description: 'The mapping of old to new status ID.',
              items: {
                type: 'object',
                description: 'The mapping of old to new status ID.',
              },
            },
            description: {
              type: 'string',
              description: 'The new description for this workflow.',
            },
            id: {
              type: 'string',
              description: 'The ID of this workflow.',
            },
            loopedTransitionContainerLayout: {
              type: 'object',
              description: 'The starting point for the statuses in the workflow.',
            },
            startPointLayout: {
              type: 'object',
              description: 'The starting point for the statuses in the workflow.',
            },
            statusMappings: {
              type: 'array',
              description: 'The mapping of old to new status ID for a specific project and issue type.',
              items: {
                type: 'object',
                description: 'The mapping of old to new status ID for a specific project and issue type.',
              },
            },
            statuses: {
              type: 'array',
              description: 'The statuses associated with this workflow.',
              items: {
                type: 'object',
                description: 'The statuses associated with this workflow.',
              },
            },
            transitions: {
              type: 'array',
              description: 'The transitions of this workflow.',
              items: {
                type: 'object',
                description: 'The transition update data.',
              },
            },
            version: {
              type: 'object',
              description: 'The current version details of this workflow scheme.',
            },
          },
          required: ['id', 'statuses', 'transitions', 'version'],
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/workflows/update',
    body: ['statuses', 'workflows'],
  },
});
