import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetEpics = defineTool({
  name: 'software:board:get_epics',
  description:
    'Get epics. Returns all epics from the board, for the given board ID. This only includes epics that the user has permission to view. Note, if the user does not have permission to view the board, no epics will be returned at all.',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
        description: 'The ID of the board that contains the requested epics.',
      },
      startAt: {
        type: 'integer',
        description:
          "The starting index of the returned epics. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: 'integer',
        description:
          "The maximum number of epics to return per page. See the 'Pagination' section at the top of this page for more details.",
      },
      done: {
        type: 'string',
        description: 'Filters results to epics that are either done or not done. Valid values: true, false.',
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/epic',
    query: ['startAt', 'maxResults', 'done'],
  },
});
