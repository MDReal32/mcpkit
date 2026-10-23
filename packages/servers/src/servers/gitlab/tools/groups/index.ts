import { groupsAccessRequestsTools } from './access-requests';
import { groupsAddOnPurchasesTools } from './add-on-purchases';
import { groupsEnterpriseUsersTools } from './enterprise-users';
import { groupsGitlabSubscriptionsTools } from './gitlab-subscriptions';
import { groupsGroupImportAndExportTools } from './group-import-and-export';
import { groupsGroupsTools } from './groups';
import { groupsInvitationsTools } from './invitations';
import { groupsLdapTools } from './ldap';
import { groupsMemberRolesTools } from './member-roles';
import { groupsMembersTools } from './members';
import { groupsNamespacesTools } from './namespaces';
import { groupsOrganizationsTools } from './organizations';
import { groupsPlanLimitsTools } from './plan-limits';
import { groupsProviderIdentitiesTools } from './provider-identities';
import { groupsSamlGroupLinksTools } from './saml-group-links';
import { groupsServiceAccountsTools } from './service-accounts';
import { groupsWorkspacesTools } from './workspaces';

export const groupsGroupTools = [
  ...groupsAccessRequestsTools,
  ...groupsAddOnPurchasesTools,
  ...groupsEnterpriseUsersTools,
  ...groupsGitlabSubscriptionsTools,
  ...groupsGroupImportAndExportTools,
  ...groupsGroupsTools,
  ...groupsInvitationsTools,
  ...groupsLdapTools,
  ...groupsMemberRolesTools,
  ...groupsMembersTools,
  ...groupsNamespacesTools,
  ...groupsOrganizationsTools,
  ...groupsPlanLimitsTools,
  ...groupsProviderIdentitiesTools,
  ...groupsSamlGroupLinksTools,
  ...groupsServiceAccountsTools,
  ...groupsWorkspacesTools,
];
