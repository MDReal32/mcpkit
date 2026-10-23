import { defineTool } from '@usemcpkit/core';

export const copilotAgentTasksGetTaskById = defineTool({
  name: 'copilot:agent_tasks:get_task_by_id',
  description: 'Get a task by ID. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      task_id: {
        type: 'string',
        description: 'The unique identifier of the task.',
      },
    },
    required: ['task_id'],
  },
  request: {
    method: 'GET',
    path: '/agents/tasks/{task_id}',
  },
});
