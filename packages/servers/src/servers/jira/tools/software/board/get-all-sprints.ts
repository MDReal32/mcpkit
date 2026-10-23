import { defineTool } from '@usemcpkit/core';

export const softwareBoardGetAllSprints = defineTool({
  name: 'software:board:get_all_sprints',
  description:
    'Get all sprints. Returns all sprints from a board, for a given board ID. This only includes sprints that the user has permission to view.',
  input: {
    type: 'object',
    properties: {
      boardId: {
        type: 'integer',
        description: 'The ID of the board that contains the requested sprints.',
      },
      startAt: {
        type: 'integer',
        description:
          "The starting index of the returned sprints. Base index: 0. See the 'Pagination' section at the top of this page for more details.",
      },
      maxResults: {
        type: 'integer',
        description:
          "The maximum number of sprints to return per page. See the 'Pagination' section at the top of this page for more details.",
      },
      state: {
        type: 'object',
        description:
          'Filters results to sprints in specified states. Valid values: future, active, closed. You can define multiple states separated by commas, e.g. state=active,closed',
      },
    },
    required: ['boardId'],
  },
  request: {
    method: 'GET',
    path: '/rest/agile/1.0/board/{boardId}/sprint',
    query: ['startAt', 'maxResults', 'state'],
  },
});
