import { copilotAgentTasksCreateTaskInRepo } from './create-task-in-repo';
import { copilotAgentTasksGetTaskById } from './get-task-by-id';
import { copilotAgentTasksGetTaskByRepoAndId } from './get-task-by-repo-and-id';
import { copilotAgentTasksListTasks } from './list-tasks';
import { copilotAgentTasksListTasksForRepo } from './list-tasks-for-repo';

export const copilotAgentTasksTools = [
  copilotAgentTasksCreateTaskInRepo,
  copilotAgentTasksGetTaskById,
  copilotAgentTasksGetTaskByRepoAndId,
  copilotAgentTasksListTasks,
  copilotAgentTasksListTasksForRepo,
];
