import { groupsProviderIdentitiesDeleteGroupsSaml } from "./delete-groups-saml";
import { groupsProviderIdentitiesDeleteGroupsScim } from "./delete-groups-scim";
import { groupsProviderIdentitiesGetGroupsSaml } from "./get-groups-saml";
import { groupsProviderIdentitiesGetGroupsSamlIdentities } from "./get-groups-saml-identities";
import { groupsProviderIdentitiesGetGroupsScim } from "./get-groups-scim";
import { groupsProviderIdentitiesGetGroupsScimIdentities } from "./get-groups-scim-identities";
import { groupsProviderIdentitiesUpdateGroupsSaml } from "./update-groups-saml";
import { groupsProviderIdentitiesUpdateGroupsScim } from "./update-groups-scim";

export const groupsProviderIdentitiesTools = [
  groupsProviderIdentitiesDeleteGroupsSaml,
  groupsProviderIdentitiesDeleteGroupsScim,
  groupsProviderIdentitiesGetGroupsSaml,
  groupsProviderIdentitiesGetGroupsSamlIdentities,
  groupsProviderIdentitiesGetGroupsScim,
  groupsProviderIdentitiesGetGroupsScimIdentities,
  groupsProviderIdentitiesUpdateGroupsSaml,
  groupsProviderIdentitiesUpdateGroupsScim,
];
