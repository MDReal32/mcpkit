import { usersPermissionSchemesCreatePermissionGrant } from "./create-permission-grant";
import { usersPermissionSchemesCreatePermissionScheme } from "./create-permission-scheme";
import { usersPermissionSchemesDeletePermissionScheme } from "./delete-permission-scheme";
import { usersPermissionSchemesDeletePermissionSchemeEntity } from "./delete-permission-scheme-entity";
import { usersPermissionSchemesGetAllPermissionSchemes } from "./get-all-permission-schemes";
import { usersPermissionSchemesGetPermissionScheme } from "./get-permission-scheme";
import { usersPermissionSchemesGetPermissionSchemeGrant } from "./get-permission-scheme-grant";
import { usersPermissionSchemesGetPermissionSchemeGrants } from "./get-permission-scheme-grants";
import { usersPermissionSchemesUpdatePermissionScheme } from "./update-permission-scheme";

export const usersPermissionSchemesTools = [
  usersPermissionSchemesCreatePermissionGrant,
  usersPermissionSchemesCreatePermissionScheme,
  usersPermissionSchemesDeletePermissionScheme,
  usersPermissionSchemesDeletePermissionSchemeEntity,
  usersPermissionSchemesGetAllPermissionSchemes,
  usersPermissionSchemesGetPermissionScheme,
  usersPermissionSchemesGetPermissionSchemeGrant,
  usersPermissionSchemesGetPermissionSchemeGrants,
  usersPermissionSchemesUpdatePermissionScheme,
];
