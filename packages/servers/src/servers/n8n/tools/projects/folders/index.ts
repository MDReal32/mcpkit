import { projectsFoldersCreateFolder } from "./create-folder";
import { projectsFoldersDeleteFolder } from "./delete-folder";
import { projectsFoldersGetFolder } from "./get-folder";
import { projectsFoldersListFolders } from "./list-folders";
import { projectsFoldersUpdateFolder } from "./update-folder";

export const projectsFoldersTools = [
  projectsFoldersCreateFolder,
  projectsFoldersDeleteFolder,
  projectsFoldersGetFolder,
  projectsFoldersListFolders,
  projectsFoldersUpdateFolder,
];
