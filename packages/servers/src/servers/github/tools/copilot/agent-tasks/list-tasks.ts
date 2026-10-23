import { defineTool } from '@usemcpkit/core';

export const copilotAgentTasksListTasks = defineTool({
  name: 'copilot:agent_tasks:list_tasks',
  description: 'List tasks. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      per_page: {
        type: 'integer',
        default: 30,
        description: 'The number of results per page (max 100).',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'The page number of the results to fetch.',
      },
      sort: {
        type: 'string',
        default: 'updated_at',
        enum: ['updated_at', 'created_at'],
        description: 'The field to sort results by. Can be `updated_at` or `created_at`.',
      },
      direction: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'The direction to sort results. Can be `asc` or `desc`.',
      },
      state: {
        type: 'string',
        description:
          'Comma-separated list of task states to filter by. Can be any combination of: `queued`, `in_progress`, `completed`, `failed`, `idle`, `waiting_for_user`, `timed_out`, `cancelled`.',
      },
      is_archived: {
        type: 'boolean',
        default: false,
        description:
          'Filter by archived status. When `true`, returns only archived tasks. When `false` or omitted, returns only non-archived tasks. Defaults to `false`.',
      },
      since: {
        type: 'string',
        description: 'Only show tasks updated at or after this time (ISO 8601 timestamp)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/agents/tasks',
    query: ['per_page', 'page', 'sort', 'direction', 'state', 'is_archived', 'since'],
  },
});
