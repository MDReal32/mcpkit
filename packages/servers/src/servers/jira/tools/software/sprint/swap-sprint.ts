import { defineTool } from '@usemcpkit/core';

export const softwareSprintSwapSprint = defineTool({
  name: 'software:sprint:swap_sprint',
  description: 'Swap sprint. Swap the position of the sprint with the second sprint.',
  input: {
    type: 'object',
    properties: {
      sprintId: {
        type: 'integer',
        description: 'The ID of the sprint to swap.',
      },
      sprintToSwapWith: {
        type: 'integer',
      },
    },
    required: ['sprintId'],
  },
  request: {
    method: 'POST',
    path: '/rest/agile/1.0/sprint/{sprintId}/swap',
    body: ['sprintToSwapWith'],
  },
});
