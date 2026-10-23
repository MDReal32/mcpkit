import { defineTool } from '@usemcpkit/core';

export const issuesBoardsUpdateProjectsBoards = defineTool({
  name: 'issues:boards:update_projects_boards',
  description: 'Update an issue board. Updates a specified issue board in a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      board_id: {
        type: 'integer',
        description: 'ID of the board.',
      },
      name: {
        type: 'string',
        description: 'Name of the board.',
      },
      hide_backlog_list: {
        type: 'boolean',
        description: 'If `true`, hides the Open list.',
      },
      hide_closed_list: {
        type: 'boolean',
        description: 'If `true`, hides the Closed list.',
      },
      assignee_id: {
        type: 'integer',
        description: 'ID of the assignee to scope the board to. Premium and Ultimate only.',
      },
      milestone_id: {
        type: 'integer',
        description: 'The ID of a milestone to associate with board',
      },
      labels: {
        type: 'string',
        description: 'Comma-separated list of label names',
      },
      weight: {
        type: 'integer',
        description: 'The weight of the board',
      },
    },
    required: ['id', 'board_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/boards/{board_id}',
    body: ['name', 'hide_backlog_list', 'hide_closed_list', 'assignee_id', 'milestone_id', 'labels', 'weight'],
  },
});
