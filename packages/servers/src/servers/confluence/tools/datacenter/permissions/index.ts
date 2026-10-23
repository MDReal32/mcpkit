import { datacenterPermissionsGetAnonymous } from './get-anonymous';
import { datacenterPermissionsGetGroup } from './get-group';
import { datacenterPermissionsGetUnlicensed } from './get-unlicensed';
import { datacenterPermissionsGetUser } from './get-user';
import { datacenterPermissionsList } from './list';

export const datacenterPermissionsTools = [
  datacenterPermissionsGetAnonymous,
  datacenterPermissionsGetGroup,
  datacenterPermissionsGetUnlicensed,
  datacenterPermissionsGetUser,
  datacenterPermissionsList,
];
