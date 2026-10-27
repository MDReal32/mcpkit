import { hierarchyListsAddTaskToList } from "./add-task-to-list";
import { hierarchyListsCreateFolderlessList } from "./create-folderless-list";
import { hierarchyListsCreateList } from "./create-list";
import { hierarchyListsCreateListFromTemplateInFolder } from "./create-list-from-template-in-folder";
import { hierarchyListsCreateListFromTemplateInSpace } from "./create-list-from-template-in-space";
import { hierarchyListsDeleteList } from "./delete-list";
import { hierarchyListsGetFolderlessLists } from "./get-folderless-lists";
import { hierarchyListsGetList } from "./get-list";
import { hierarchyListsGetLists } from "./get-lists";
import { hierarchyListsRemoveTaskFromList } from "./remove-task-from-list";
import { hierarchyListsUpdateList } from "./update-list";

export const hierarchyListsTools = [
  hierarchyListsAddTaskToList,
  hierarchyListsCreateFolderlessList,
  hierarchyListsCreateList,
  hierarchyListsCreateListFromTemplateInFolder,
  hierarchyListsCreateListFromTemplateInSpace,
  hierarchyListsDeleteList,
  hierarchyListsGetFolderlessLists,
  hierarchyListsGetList,
  hierarchyListsGetLists,
  hierarchyListsRemoveTaskFromList,
  hierarchyListsUpdateList,
];
