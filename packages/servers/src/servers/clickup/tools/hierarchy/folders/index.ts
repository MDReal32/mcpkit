import { hierarchyFoldersCreateFolder } from "./create-folder";
import { hierarchyFoldersCreateFolderFromTemplate } from "./create-folder-from-template";
import { hierarchyFoldersDeleteFolder } from "./delete-folder";
import { hierarchyFoldersGetFolder } from "./get-folder";
import { hierarchyFoldersGetFolders } from "./get-folders";
import { hierarchyFoldersMoveFolder } from "./move-folder";
import { hierarchyFoldersUpdateFolder } from "./update-folder";

export const hierarchyFoldersTools = [
  hierarchyFoldersCreateFolder,
  hierarchyFoldersCreateFolderFromTemplate,
  hierarchyFoldersDeleteFolder,
  hierarchyFoldersGetFolder,
  hierarchyFoldersGetFolders,
  hierarchyFoldersMoveFolder,
  hierarchyFoldersUpdateFolder,
];
