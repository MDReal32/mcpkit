import { defineTool } from '@usemcpkit/core';

export const copilotAgentTasksListTasksForRepo = defineTool({
  name: 'copilot:agent_tasks:list_tasks_for_repo',
  description: 'List tasks for repository. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository. The name is not case sensitive.',
      },
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
      creator_id: {
        type: 'string',
        description: 'Filter tasks by creator user ID. Accepts one or more user IDs. (comma-separated)',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/agents/repos/{owner}/{repo}/tasks',
    query: ['per_page', 'page', 'sort', 'direction', 'state', 'is_archived', 'since', 'creator_id'],
  },
});
