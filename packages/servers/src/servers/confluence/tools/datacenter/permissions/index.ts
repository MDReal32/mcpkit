import { datacenterPermissionsGetAnonymous } from "./get-anonymous";
import { datacenterPermissionsGetGroup } from "./get-group";
import { datacenterPermissionsGetUnlicensed } from "./get-unlicensed";
import { datacenterPermissionsGetUser } from "./get-user";
import { datacenterPermissionsList } from "./list";
import { datacenterPermissionsUpdate } from "./update";
import { datacenterPermissionsUpdateAnonymousGrant } from "./update-anonymous-grant";
import { datacenterPermissionsUpdateAnonymousRevoke } from "./update-anonymous-revoke";
import { datacenterPermissionsUpdateGroupGrant } from "./update-group-grant";
import { datacenterPermissionsUpdateGroupRevoke } from "./update-group-revoke";
import { datacenterPermissionsUpdateUnlicensedGrant } from "./update-unlicensed-grant";
import { datacenterPermissionsUpdateUnlicensedRevoke } from "./update-unlicensed-revoke";
import { datacenterPermissionsUpdateUserGrant } from "./update-user-grant";
import { datacenterPermissionsUpdateUserRevoke } from "./update-user-revoke";

export const datacenterPermissionsTools = [
  datacenterPermissionsGetAnonymous,
  datacenterPermissionsGetGroup,
  datacenterPermissionsGetUnlicensed,
  datacenterPermissionsGetUser,
  datacenterPermissionsList,
  datacenterPermissionsUpdate,
  datacenterPermissionsUpdateAnonymousGrant,
  datacenterPermissionsUpdateAnonymousRevoke,
  datacenterPermissionsUpdateGroupGrant,
  datacenterPermissionsUpdateGroupRevoke,
  datacenterPermissionsUpdateUnlicensedGrant,
  datacenterPermissionsUpdateUnlicensedRevoke,
  datacenterPermissionsUpdateUserGrant,
  datacenterPermissionsUpdateUserRevoke,
];
