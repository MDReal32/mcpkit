import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetProjectsFull = defineTool({
  name: 'software:board:get_projects_full',
  description:
    'Get projects full. Returns all projects that are statically associated with the board, for the given board ID. Returned projects are ordered by the name.',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
        description: 'The ID of the board that contains returned projects.',
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/project/full',
  },
});
