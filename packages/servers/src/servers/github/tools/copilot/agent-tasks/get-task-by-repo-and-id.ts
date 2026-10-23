import { defineTool } from '@usemcpkit/core';

export const copilotAgentTasksGetTaskByRepoAndId = defineTool({
  name: 'copilot:agent_tasks:get_task_by_repo_and_id',
  description: 'Get a task by repo. > [!NOTE] > This endpoint is in public preview and is subject to change.',
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
      task_id: {
        type: 'string',
        description: 'The unique identifier of the task.',
      },
    },
    required: ['owner', 'repo', 'task_id'],
  },
  request: {
    method: 'GET',
    path: '/agents/repos/{owner}/{repo}/tasks/{task_id}',
  },
});
