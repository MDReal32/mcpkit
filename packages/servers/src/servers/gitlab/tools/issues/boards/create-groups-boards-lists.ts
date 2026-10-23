import { defineTool } from '@usemcpkit/core';

export const issuesBoardsCreateGroupsBoardsLists = defineTool({
  name: 'issues:boards:create_groups_boards_lists',
  description: 'Create a group issue board list. Creates a group issue board list for a specified board.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      board_id: {
        type: 'integer',
        description: 'ID of the board.',
      },
      label_id: {
        type: 'integer',
        description:
          'ID of the label. Exactly one of `label_id`, `milestone_id`, `iteration_id`, `assignee_id`, `status_id` must be provided.',
      },
      milestone_id: {
        type: 'integer',
        description:
          'The ID of an existing milestone. Exactly one of `label_id`, `milestone_id`, `iteration_id`, `assignee_id`, `status_id` must be provided.',
      },
      iteration_id: {
        type: 'integer',
        description:
          'ID of the iteration. Premium and Ultimate only. Exactly one of `label_id`, `milestone_id`, `iteration_id`, `assignee_id`, `status_id` must be provided.',
      },
      assignee_id: {
        type: 'integer',
        description:
          'ID of the user. Premium and Ultimate only. Exactly one of `label_id`, `milestone_id`, `iteration_id`, `assignee_id`, `status_id` must be provided.',
      },
      status_id: {
        type: 'integer',
        description:
          'ID of the status. Premium and Ultimate only. Exactly one of `label_id`, `milestone_id`, `iteration_id`, `assignee_id`, `status_id` must be provided.',
      },
    },
    required: ['id', 'board_id'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/boards/{board_id}/lists',
    body: ['label_id', 'milestone_id', 'iteration_id', 'assignee_id', 'status_id'],
  },
});
