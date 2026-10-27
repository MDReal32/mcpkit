import { tasksTaskChecklistsCreateChecklist } from "./create-checklist";
import { tasksTaskChecklistsCreateChecklistItem } from "./create-checklist-item";
import { tasksTaskChecklistsDeleteChecklist } from "./delete-checklist";
import { tasksTaskChecklistsDeleteChecklistItem } from "./delete-checklist-item";
import { tasksTaskChecklistsEditChecklist } from "./edit-checklist";
import { tasksTaskChecklistsEditChecklistItem } from "./edit-checklist-item";

export const tasksTaskChecklistsTools = [
  tasksTaskChecklistsCreateChecklist,
  tasksTaskChecklistsCreateChecklistItem,
  tasksTaskChecklistsDeleteChecklist,
  tasksTaskChecklistsDeleteChecklistItem,
  tasksTaskChecklistsEditChecklist,
  tasksTaskChecklistsEditChecklistItem,
];
