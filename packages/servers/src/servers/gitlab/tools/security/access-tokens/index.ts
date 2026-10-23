import { securityAccessTokensCreateGroupsAccessTokens } from "./create-groups-access-tokens";
import { securityAccessTokensCreateGroupsAccessTokensRotate } from "./create-groups-access-tokens-rotate";
import { securityAccessTokensCreateGroupsAccessTokensSelfRotate } from "./create-groups-access-tokens-self-rotate";
import { securityAccessTokensCreateGroupsServiceAccountsPersonalAccessTokens } from "./create-groups-service-accounts-personal-access-tokens";
import { securityAccessTokensCreateGroupsServiceAccountsPersonalAccessTokensRotate } from "./create-groups-service-accounts-personal-access-tokens-rotate";
import { securityAccessTokensCreatePersonalAccessTokensRotate } from "./create-personal-access-tokens-rotate";
import { securityAccessTokensCreatePersonalAccessTokensSelfRotate } from "./create-personal-access-tokens-self-rotate";
import { securityAccessTokensCreateProjectsAccessTokens } from "./create-projects-access-tokens";
import { securityAccessTokensCreateProjectsAccessTokensRotate } from "./create-projects-access-tokens-rotate";
import { securityAccessTokensCreateProjectsAccessTokensSelfRotate } from "./create-projects-access-tokens-self-rotate";
import { securityAccessTokensCreateProjectsServiceAccountsPersonalAccessTokens } from "./create-projects-service-accounts-personal-access-tokens";
import { securityAccessTokensCreateProjectsServiceAccountsPersonalAccessTokensRotate } from "./create-projects-service-accounts-personal-access-tokens-rotate";
import { securityAccessTokensCreateUserPersonalAccessTokens } from "./create-user-personal-access-tokens";
import { securityAccessTokensCreateUsersImpersonationTokens } from "./create-users-impersonation-tokens";
import { securityAccessTokensCreateUsersPersonalAccessTokens } from "./create-users-personal-access-tokens";
import { securityAccessTokensDeleteGroupsAccessTokens } from "./delete-groups-access-tokens";
import { securityAccessTokensDeleteGroupsServiceAccountsPersonalAccessTokens } from "./delete-groups-service-accounts-personal-access-tokens";
import { securityAccessTokensDeletePersonalAccessTokens } from "./delete-personal-access-tokens";
import { securityAccessTokensDeletePersonalAccessTokensSelf } from "./delete-personal-access-tokens-self";
import { securityAccessTokensDeleteProjectsAccessTokens } from "./delete-projects-access-tokens";
import { securityAccessTokensDeleteProjectsServiceAccountsPersonalAccessTokens } from "./delete-projects-service-accounts-personal-access-tokens";
import { securityAccessTokensDeleteUsersImpersonationTokens } from "./delete-users-impersonation-tokens";
import { securityAccessTokensGetGroupsAccessTokens } from "./get-groups-access-tokens";
import { securityAccessTokensGetPersonalAccessTokens } from "./get-personal-access-tokens";
import { securityAccessTokensGetPersonalAccessTokensSelf } from "./get-personal-access-tokens-self";
import { securityAccessTokensGetProjectsAccessTokens } from "./get-projects-access-tokens";
import { securityAccessTokensGetUsersImpersonationTokens } from "./get-users-impersonation-tokens";
import { securityAccessTokensListGroupsAccessTokens } from "./list-groups-access-tokens";
import { securityAccessTokensListGroupsServiceAccountsPersonalAccessTokens } from "./list-groups-service-accounts-personal-access-tokens";
import { securityAccessTokensListPersonalAccessTokens } from "./list-personal-access-tokens";
import { securityAccessTokensListPersonalAccessTokensSelfAssociations } from "./list-personal-access-tokens-self-associations";
import { securityAccessTokensListProjectsAccessTokens } from "./list-projects-access-tokens";
import { securityAccessTokensListProjectsServiceAccountsPersonalAccessTokens } from "./list-projects-service-accounts-personal-access-tokens";
import { securityAccessTokensListUsersImpersonationTokens } from "./list-users-impersonation-tokens";

export const securityAccessTokensTools = [
  securityAccessTokensCreateGroupsAccessTokens,
  securityAccessTokensCreateGroupsAccessTokensRotate,
  securityAccessTokensCreateGroupsAccessTokensSelfRotate,
  securityAccessTokensCreateGroupsServiceAccountsPersonalAccessTokens,
  securityAccessTokensCreateGroupsServiceAccountsPersonalAccessTokensRotate,
  securityAccessTokensCreatePersonalAccessTokensRotate,
  securityAccessTokensCreatePersonalAccessTokensSelfRotate,
  securityAccessTokensCreateProjectsAccessTokens,
  securityAccessTokensCreateProjectsAccessTokensRotate,
  securityAccessTokensCreateProjectsAccessTokensSelfRotate,
  securityAccessTokensCreateProjectsServiceAccountsPersonalAccessTokens,
  securityAccessTokensCreateProjectsServiceAccountsPersonalAccessTokensRotate,
  securityAccessTokensCreateUserPersonalAccessTokens,
  securityAccessTokensCreateUsersImpersonationTokens,
  securityAccessTokensCreateUsersPersonalAccessTokens,
  securityAccessTokensDeleteGroupsAccessTokens,
  securityAccessTokensDeleteGroupsServiceAccountsPersonalAccessTokens,
  securityAccessTokensDeletePersonalAccessTokens,
  securityAccessTokensDeletePersonalAccessTokensSelf,
  securityAccessTokensDeleteProjectsAccessTokens,
  securityAccessTokensDeleteProjectsServiceAccountsPersonalAccessTokens,
  securityAccessTokensDeleteUsersImpersonationTokens,
  securityAccessTokensGetGroupsAccessTokens,
  securityAccessTokensGetPersonalAccessTokens,
  securityAccessTokensGetPersonalAccessTokensSelf,
  securityAccessTokensGetProjectsAccessTokens,
  securityAccessTokensGetUsersImpersonationTokens,
  securityAccessTokensListGroupsAccessTokens,
  securityAccessTokensListGroupsServiceAccountsPersonalAccessTokens,
  securityAccessTokensListPersonalAccessTokens,
  securityAccessTokensListPersonalAccessTokensSelfAssociations,
  securityAccessTokensListProjectsAccessTokens,
  securityAccessTokensListProjectsServiceAccountsPersonalAccessTokens,
  securityAccessTokensListUsersImpersonationTokens,
];
