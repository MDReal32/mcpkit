import { tasksTasksCreateTask } from "./create-task";
import { tasksTasksCreateTaskFromTemplate } from "./create-task-from-template";
import { tasksTasksDeleteTask } from "./delete-task";
import { tasksTasksGetBulkTasksTimeInStatus } from "./get-bulk-tasks-time-in-status";
import { tasksTasksGetFilteredTeamTasks } from "./get-filtered-team-tasks";
import { tasksTasksGetTask } from "./get-task";
import { tasksTasksGetTasks } from "./get-tasks";
import { tasksTasksGetTasksTimeInStatus } from "./get-tasks-time-in-status";
import { tasksTasksMergeTasks } from "./merge-tasks";
import { tasksTasksMoveATaskToANewList } from "./move-a-task-to-a-new-list";
import { tasksTasksReplaceTaskTimeEstimates } from "./replace-task-time-estimates";
import { tasksTasksUpdateTask } from "./update-task";
import { tasksTasksUpdateTaskTimeEstimatesByUser } from "./update-task-time-estimates-by-user";

export const tasksTasksTools = [
  tasksTasksCreateTask,
  tasksTasksCreateTaskFromTemplate,
  tasksTasksDeleteTask,
  tasksTasksGetBulkTasksTimeInStatus,
  tasksTasksGetFilteredTeamTasks,
  tasksTasksGetTask,
  tasksTasksGetTasks,
  tasksTasksGetTasksTimeInStatus,
  tasksTasksMergeTasks,
  tasksTasksMoveATaskToANewList,
  tasksTasksReplaceTaskTimeEstimates,
  tasksTasksUpdateTask,
  tasksTasksUpdateTaskTimeEstimatesByUser,
];
