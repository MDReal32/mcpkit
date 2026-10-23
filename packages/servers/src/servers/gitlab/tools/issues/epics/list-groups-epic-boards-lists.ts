import { defineTool } from '@usemcpkit/core';

export const issuesEpicsListGroupsEpicBoardsLists = defineTool({
  name: 'issues:epics:list_groups_epic_boards_lists',
  description:
    'List all group epic board lists. Lists all group epic board lists for a specified board. Does not include `open` and `closed` lists. This feature was introduced in GitLab 15.9.',
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
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'board_id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/epic_boards/{board_id}/lists',
    query: ['page', 'per_page'],
  },
});
