import { defineTool } from '@usemcpkit/core';

export const softwareSprintUpdateSprint = defineTool({
  name: 'software:sprint:update_sprint',
  description:
    'Update sprint. Performs a full update of a sprint. A full update means that the result will be exactly the same as the request body. Any fields not present in the request JSON will be set to null.',
  input: {
    type: 'object',
    properties: {
      sprintId: {
        type: 'integer',
        description: 'the ID of the sprint to update.',
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
    method: 'PUT',
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
