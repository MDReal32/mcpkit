import { defineTool } from '@usemcpkit/core';

export const issuesEpicsGetGroupsEpicBoardsLists = defineTool({
  name: 'issues:epics:get_groups_epic_boards_lists',
  description:
    'Retrieve a group epic board list. Retrieves a specified group epic board list. This feature was introduced in GitLab 15.9.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      board_id: {
        type: 'integer',
        description: 'ID of the epic board.',
      },
      list_id: {
        type: 'integer',
        description: "ID of the epic board's list.",
      },
    },
    required: ['id', 'board_id', 'list_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/epic_boards/{board_id}/lists/{list_id}',
  },
});
