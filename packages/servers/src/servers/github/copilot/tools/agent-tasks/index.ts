import { agentTasksCreateTaskInRepo } from './create-task-in-repo';
import { agentTasksGetTaskById } from './get-task-by-id';
import { agentTasksGetTaskByRepoAndId } from './get-task-by-repo-and-id';
import { agentTasksListTasks } from './list-tasks';
import { agentTasksListTasksForRepo } from './list-tasks-for-repo';

export const agentTasksTools = [
  agentTasksCreateTaskInRepo,
  agentTasksGetTaskById,
  agentTasksGetTaskByRepoAndId,
  agentTasksListTasks,
  agentTasksListTasksForRepo,
];
