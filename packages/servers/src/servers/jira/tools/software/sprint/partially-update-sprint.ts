import { defineTool } from '@usemcpkit/core';

export const softwareSprintPartiallyUpdateSprint = defineTool({
  name: 'software:sprint:partially_update_sprint',
  description:
    'Partially update sprint. Performs a partial update of a sprint. A partial update means that fields not present in the request JSON will not be updated.',
  input: {
    type: 'object',
    properties: {
      sprintId: {
        type: 'integer',
        description: 'The ID of the sprint to update.',
      },
      completeDate: {
        type: 'string',
      },
      createdDate: {
        type: 'string',
      },
      endDate: {
        type: 'string',
      },
      goal: {
        type: 'string',
      },
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
      originBoardId: {
        type: 'integer',
      },
      self: {
        type: 'string',
      },
      startDate: {
        type: 'string',
      },
      state: {
        type: 'string',
      },
    },
    required: ['sprintId'],
  },
  request: {
    method: 'POST',
    path: '/rest/agile/1.0/sprint/{sprintId}',
    body: [
      'completeDate',
      'createdDate',
      'endDate',
      'goal',
      'id',
      'name',
      'originBoardId',
      'self',
      'startDate',
      'state',
    ],
  },
});
