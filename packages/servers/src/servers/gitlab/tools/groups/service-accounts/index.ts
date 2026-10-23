import { groupsServiceAccountsCreateGroupsServiceAccounts } from "./create-groups-service-accounts";
import { groupsServiceAccountsCreateProjectsServiceAccounts } from "./create-projects-service-accounts";
import { groupsServiceAccountsCreateServiceAccounts } from "./create-service-accounts";
import { groupsServiceAccountsDeleteGroupsServiceAccounts } from "./delete-groups-service-accounts";
import { groupsServiceAccountsDeleteProjectsServiceAccounts } from "./delete-projects-service-accounts";
import { groupsServiceAccountsGetGroupsServiceAccounts } from "./get-groups-service-accounts";
import { groupsServiceAccountsGetProjectsServiceAccounts } from "./get-projects-service-accounts";
import { groupsServiceAccountsListGroupsServiceAccounts } from "./list-groups-service-accounts";
import { groupsServiceAccountsListProjectsServiceAccounts } from "./list-projects-service-accounts";
import { groupsServiceAccountsListServiceAccounts } from "./list-service-accounts";
import { groupsServiceAccountsUpdateGroupsServiceAccounts } from "./update-groups-service-accounts";
import { groupsServiceAccountsUpdateProjectsServiceAccounts } from "./update-projects-service-accounts";
import { groupsServiceAccountsUpdateServiceAccounts } from "./update-service-accounts";

export const groupsServiceAccountsTools = [
  groupsServiceAccountsCreateGroupsServiceAccounts,
  groupsServiceAccountsCreateProjectsServiceAccounts,
  groupsServiceAccountsCreateServiceAccounts,
  groupsServiceAccountsDeleteGroupsServiceAccounts,
  groupsServiceAccountsDeleteProjectsServiceAccounts,
  groupsServiceAccountsGetGroupsServiceAccounts,
  groupsServiceAccountsGetProjectsServiceAccounts,
  groupsServiceAccountsListGroupsServiceAccounts,
  groupsServiceAccountsListProjectsServiceAccounts,
  groupsServiceAccountsListServiceAccounts,
  groupsServiceAccountsUpdateGroupsServiceAccounts,
  groupsServiceAccountsUpdateProjectsServiceAccounts,
  groupsServiceAccountsUpdateServiceAccounts,
];
