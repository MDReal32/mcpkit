import { defineTool } from '@usemcpkit/core';

export const workflowsStatusUpdateStatuses = defineTool({
  name: 'workflows:status:update_statuses',
  description: 'Bulk update statuses. Updates statuses by ID.',
  input: {
    type: 'object',
    properties: {
      statuses: {
        type: 'array',
        description: 'The list of statuses that will be updated.',
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
              description: 'The ID of the status.',
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
          },
          required: ['id', 'name', 'statusCategory'],
        },
      },
    },
    required: ['statuses'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/statuses',
    body: ['statuses'],
  },
});
