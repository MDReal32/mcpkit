import { usersPermissionsGetAllPermissions } from './get-all-permissions';
import { usersPermissionsGetBulkPermissions } from './get-bulk-permissions';
import { usersPermissionsGetMyPermissions } from './get-my-permissions';
import { usersPermissionsGetPermittedProjects } from './get-permitted-projects';

export const usersPermissionsTools = [
  usersPermissionsGetAllPermissions,
  usersPermissionsGetBulkPermissions,
  usersPermissionsGetMyPermissions,
  usersPermissionsGetPermittedProjects,
];
