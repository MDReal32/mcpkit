import { hierarchyFoldersTools } from "./folders";
import { hierarchyListsTools } from "./lists";
import { hierarchySharedHierarchyTools } from "./shared-hierarchy";
import { hierarchySpacesTools } from "./spaces";
import { hierarchyTemplatesTools } from "./templates";
import { hierarchyViewsTools } from "./views";
import { hierarchyWorkspacesTools } from "./workspaces";

export const hierarchyGroupTools = [
  ...hierarchyFoldersTools,
  ...hierarchyListsTools,
  ...hierarchySharedHierarchyTools,
  ...hierarchySpacesTools,
  ...hierarchyTemplatesTools,
  ...hierarchyViewsTools,
  ...hierarchyWorkspacesTools,
];
