import { cloudFoldersAddFolderPermissions } from './add-folder-permissions';
import { cloudFoldersCreateFolder } from './create-folder';
import { cloudFoldersCreateFolderProperty } from './create-folder-property';
import { cloudFoldersDeleteFolder } from './delete-folder';
import { cloudFoldersDeleteFolderPermissions } from './delete-folder-permissions';
import { cloudFoldersDeleteFolderPropertyById } from './delete-folder-property-by-id';
import { cloudFoldersGetFolderAncestors } from './get-folder-ancestors';
import { cloudFoldersGetFolderById } from './get-folder-by-id';
import { cloudFoldersGetFolderContentProperties } from './get-folder-content-properties';
import { cloudFoldersGetFolderContentPropertiesById } from './get-folder-content-properties-by-id';
import { cloudFoldersGetFolderDescendants } from './get-folder-descendants';
import { cloudFoldersGetFolderDirectChildren } from './get-folder-direct-children';
import { cloudFoldersGetFolderOperations } from './get-folder-operations';
import { cloudFoldersGetFolderPermissions } from './get-folder-permissions';
import { cloudFoldersGetFolderRestrictionState } from './get-folder-restriction-state';
import { cloudFoldersSetFolderPermissions } from './set-folder-permissions';
import { cloudFoldersSetFolderRestrictionState } from './set-folder-restriction-state';
import { cloudFoldersUpdateFolderPropertyById } from './update-folder-property-by-id';

export const cloudFoldersTools = [
  cloudFoldersAddFolderPermissions,
  cloudFoldersCreateFolder,
  cloudFoldersCreateFolderProperty,
  cloudFoldersDeleteFolder,
  cloudFoldersDeleteFolderPermissions,
  cloudFoldersDeleteFolderPropertyById,
  cloudFoldersGetFolderAncestors,
  cloudFoldersGetFolderById,
  cloudFoldersGetFolderContentProperties,
  cloudFoldersGetFolderContentPropertiesById,
  cloudFoldersGetFolderDescendants,
  cloudFoldersGetFolderDirectChildren,
  cloudFoldersGetFolderOperations,
  cloudFoldersGetFolderPermissions,
  cloudFoldersGetFolderRestrictionState,
  cloudFoldersSetFolderPermissions,
  cloudFoldersSetFolderRestrictionState,
  cloudFoldersUpdateFolderPropertyById,
];
