import { defineTool } from '@usemcpkit/core';

export const issuesTasksGetTask = defineTool({
  name: 'issues:tasks:get_task',
  description: 'Get task. Returns the status of a long-running asynchronous task.',
  input: {
    type: 'object',
    properties: {
      taskId: {
        type: 'string',
        description: 'The ID of the task.',
      },
    },
    required: ['taskId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/task/{taskId}',
  },
});
