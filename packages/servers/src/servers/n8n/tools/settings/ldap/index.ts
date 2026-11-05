import { settingsLdapGetLdapConfiguration } from "./get-ldap-configuration";
import { settingsLdapGetLdapSync } from "./get-ldap-sync";
import { settingsLdapRunLdapSync } from "./run-ldap-sync";
import { settingsLdapUpdateLdapConfiguration } from "./update-ldap-configuration";

export const settingsLdapTools = [
  settingsLdapGetLdapConfiguration,
  settingsLdapGetLdapSync,
  settingsLdapRunLdapSync,
  settingsLdapUpdateLdapConfiguration,
];
