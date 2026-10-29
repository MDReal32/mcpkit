import { tasksTaskRelationshipsAddDependency } from "./add-dependency";
import { tasksTaskRelationshipsAddTaskLink } from "./add-task-link";
import { tasksTaskRelationshipsDeleteDependency } from "./delete-dependency";
import { tasksTaskRelationshipsDeleteTaskLink } from "./delete-task-link";

export const tasksTaskRelationshipsTools = [
  tasksTaskRelationshipsAddDependency,
  tasksTaskRelationshipsAddTaskLink,
  tasksTaskRelationshipsDeleteDependency,
  tasksTaskRelationshipsDeleteTaskLink,
];
