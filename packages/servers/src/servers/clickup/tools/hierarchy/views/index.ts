import { hierarchyViewsCreateFolderView } from "./create-folder-view";
import { hierarchyViewsCreateListView } from "./create-list-view";
import { hierarchyViewsCreateSpaceView } from "./create-space-view";
import { hierarchyViewsCreateWorkspaceEverythingLevelView } from "./create-workspace-everything-level-view";
import { hierarchyViewsDeleteView } from "./delete-view";
import { hierarchyViewsGetFolderViews } from "./get-folder-views";
import { hierarchyViewsGetListViews } from "./get-list-views";
import { hierarchyViewsGetSpaceViews } from "./get-space-views";
import { hierarchyViewsGetView } from "./get-view";
import { hierarchyViewsGetViewTasks } from "./get-view-tasks";
import { hierarchyViewsGetWorkspaceEverythingLevelViews } from "./get-workspace-everything-level-views";
import { hierarchyViewsUpdateView } from "./update-view";

export const hierarchyViewsTools = [
  hierarchyViewsCreateFolderView,
  hierarchyViewsCreateListView,
  hierarchyViewsCreateSpaceView,
  hierarchyViewsCreateWorkspaceEverythingLevelView,
  hierarchyViewsDeleteView,
  hierarchyViewsGetFolderViews,
  hierarchyViewsGetListViews,
  hierarchyViewsGetSpaceViews,
  hierarchyViewsGetView,
  hierarchyViewsGetViewTasks,
  hierarchyViewsGetWorkspaceEverythingLevelViews,
  hierarchyViewsUpdateView,
];
