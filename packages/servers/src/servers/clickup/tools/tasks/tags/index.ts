import { tasksTagsAddTagToTask } from "./add-tag-to-task";
import { tasksTagsCreateSpaceTag } from "./create-space-tag";
import { tasksTagsDeleteSpaceTag } from "./delete-space-tag";
import { tasksTagsEditSpaceTag } from "./edit-space-tag";
import { tasksTagsGetSpaceTags } from "./get-space-tags";
import { tasksTagsRemoveTagFromTask } from "./remove-tag-from-task";

export const tasksTagsTools = [
  tasksTagsAddTagToTask,
  tasksTagsCreateSpaceTag,
  tasksTagsDeleteSpaceTag,
  tasksTagsEditSpaceTag,
  tasksTagsGetSpaceTags,
  tasksTagsRemoveTagFromTask,
];
