import { cloudSpacePermissionsBulkAssignSpacePermissionRoles } from "./bulk-assign-space-permission-roles";
import { cloudSpacePermissionsBulkRemoveSpacePermissionAccess } from "./bulk-remove-space-permission-access";
import { cloudSpacePermissionsGenerateSpacePermissionCombinations } from "./generate-space-permission-combinations";
import { cloudSpacePermissionsGetAvailableSpacePermissions } from "./get-available-space-permissions";
import { cloudSpacePermissionsGetSpacePermissionTransitionTaskStatus } from "./get-space-permission-transition-task-status";
import { cloudSpacePermissionsListSpacePermissionCombinations } from "./list-space-permission-combinations";

export const cloudSpacePermissionsTools = [
  cloudSpacePermissionsBulkAssignSpacePermissionRoles,
  cloudSpacePermissionsBulkRemoveSpacePermissionAccess,
  cloudSpacePermissionsGenerateSpacePermissionCombinations,
  cloudSpacePermissionsGetAvailableSpacePermissions,
  cloudSpacePermissionsGetSpacePermissionTransitionTaskStatus,
  cloudSpacePermissionsListSpacePermissionCombinations,
];
