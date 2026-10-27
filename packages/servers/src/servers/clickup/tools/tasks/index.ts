import { tasksAttachmentsTools } from "./attachments";
import { tasksCommentsTools } from "./comments";
import { tasksCustomFieldsTools } from "./custom-fields";
import { tasksCustomTaskTypesTools } from "./custom-task-types";
import { tasksMembersTools } from "./members";
import { tasksTagsTools } from "./tags";
import { tasksTaskChecklistsTools } from "./task-checklists";
import { tasksTaskRelationshipsTools } from "./task-relationships";
import { tasksTasksTools } from "./tasks";

export const tasksGroupTools = [
  ...tasksAttachmentsTools,
  ...tasksCommentsTools,
  ...tasksCustomFieldsTools,
  ...tasksCustomTaskTypesTools,
  ...tasksMembersTools,
  ...tasksTagsTools,
  ...tasksTaskChecklistsTools,
  ...tasksTaskRelationshipsTools,
  ...tasksTasksTools,
];
