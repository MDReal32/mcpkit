import { groupsLdapCreateGroupsLdapGroupLinks } from "./create-groups-ldap-group-links";
import { groupsLdapCreateGroupsLdapSync } from "./create-groups-ldap-sync";
import { groupsLdapDeleteGroupsLdapGroupLinks } from "./delete-groups-ldap-group-links";
import { groupsLdapDeleteGroupsLdapGroupLinksDelete } from "./delete-groups-ldap-group-links-delete";
import { groupsLdapDeleteGroupsLdapGroupLinksDelete2 } from "./delete-groups-ldap-group-links-delete-2";
import { groupsLdapListGroupsLdapGroupLinks } from "./list-groups-ldap-group-links";
import { groupsLdapListLdapGroups } from "./list-ldap-groups";
import { groupsLdapListLdapGroupsGet } from "./list-ldap-groups-get";

export const groupsLdapTools = [
  groupsLdapCreateGroupsLdapGroupLinks,
  groupsLdapCreateGroupsLdapSync,
  groupsLdapDeleteGroupsLdapGroupLinks,
  groupsLdapDeleteGroupsLdapGroupLinksDelete,
  groupsLdapDeleteGroupsLdapGroupLinksDelete2,
  groupsLdapListGroupsLdapGroupLinks,
  groupsLdapListLdapGroups,
  groupsLdapListLdapGroupsGet,
];
