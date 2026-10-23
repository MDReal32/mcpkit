import { cloudSpaceRolesCreateSpaceRole } from "./create-space-role";
import { cloudSpaceRolesDeleteSpaceRole } from "./delete-space-role";
import { cloudSpaceRolesGetAvailableSpaceRoles } from "./get-available-space-roles";
import { cloudSpaceRolesGetSpaceRolesById } from "./get-space-roles-by-id";
import { cloudSpaceRolesUpdateSpaceRole } from "./update-space-role";

export const cloudSpaceRolesTools = [
  cloudSpaceRolesCreateSpaceRole,
  cloudSpaceRolesDeleteSpaceRole,
  cloudSpaceRolesGetAvailableSpaceRoles,
  cloudSpaceRolesGetSpaceRolesById,
  cloudSpaceRolesUpdateSpaceRole,
];
