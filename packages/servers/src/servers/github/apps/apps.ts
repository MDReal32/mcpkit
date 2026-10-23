import { defineGithubServer } from '../../../providers/github';

import { appsAddRepoToInstallationForAuthenticatedUser } from './tools/apps/add-repo-to-installation-for-authenticated-user';
import { appsCheckToken } from './tools/apps/check-token';
import { appsCreateFromManifest } from './tools/apps/create-from-manifest';
import { appsCreateInstallationAccessToken } from './tools/apps/create-installation-access-token';
import { appsDeleteAuthorization } from './tools/apps/delete-authorization';
import { appsDeleteInstallation } from './tools/apps/delete-installation';
import { appsDeleteToken } from './tools/apps/delete-token';
import { appsGetAuthenticated } from './tools/apps/get-authenticated';
import { appsGetBySlug } from './tools/apps/get-by-slug';
import { appsGetInstallation } from './tools/apps/get-installation';
import { appsGetOrgInstallation } from './tools/apps/get-org-installation';
import { appsGetRepoInstallation } from './tools/apps/get-repo-installation';
import { appsGetSubscriptionPlanForAccount } from './tools/apps/get-subscription-plan-for-account';
import { appsGetSubscriptionPlanForAccountStubbed } from './tools/apps/get-subscription-plan-for-account-stubbed';
import { appsGetUserInstallation } from './tools/apps/get-user-installation';
import { appsGetWebhookConfigForApp } from './tools/apps/get-webhook-config-for-app';
import { appsGetWebhookDelivery } from './tools/apps/get-webhook-delivery';
import { appsListAccountsForPlan } from './tools/apps/list-accounts-for-plan';
import { appsListAccountsForPlanStubbed } from './tools/apps/list-accounts-for-plan-stubbed';
import { appsListInstallationReposForAuthenticatedUser } from './tools/apps/list-installation-repos-for-authenticated-user';
import { appsListInstallationRequestsForAuthenticatedApp } from './tools/apps/list-installation-requests-for-authenticated-app';
import { appsListInstallations } from './tools/apps/list-installations';
import { appsListInstallationsForAuthenticatedUser } from './tools/apps/list-installations-for-authenticated-user';
import { appsListPlans } from './tools/apps/list-plans';
import { appsListPlansStubbed } from './tools/apps/list-plans-stubbed';
import { appsListReposAccessibleToInstallation } from './tools/apps/list-repos-accessible-to-installation';
import { appsListSubscriptionsForAuthenticatedUser } from './tools/apps/list-subscriptions-for-authenticated-user';
import { appsListSubscriptionsForAuthenticatedUserStubbed } from './tools/apps/list-subscriptions-for-authenticated-user-stubbed';
import { appsListWebhookDeliveries } from './tools/apps/list-webhook-deliveries';
import { appsRedeliverWebhookDelivery } from './tools/apps/redeliver-webhook-delivery';
import { appsRemoveRepoFromInstallationForAuthenticatedUser } from './tools/apps/remove-repo-from-installation-for-authenticated-user';
import { appsResetToken } from './tools/apps/reset-token';
import { appsRevokeInstallationAccessToken } from './tools/apps/revoke-installation-access-token';
import { appsScopeToken } from './tools/apps/scope-token';
import { appsSuspendInstallation } from './tools/apps/suspend-installation';
import { appsUnsuspendInstallation } from './tools/apps/unsuspend-installation';
import { appsUpdateWebhookConfigForApp } from './tools/apps/update-webhook-config-for-app';
import { codespacesAddRepositoryForSecretForAuthenticatedUser } from './tools/codespaces/add-repository-for-secret-for-authenticated-user';
import { codespacesAddSelectedRepoToOrgSecret } from './tools/codespaces/add-selected-repo-to-org-secret';
import { codespacesCheckPermissionsForDevcontainer } from './tools/codespaces/check-permissions-for-devcontainer';
import { codespacesCodespaceMachinesForAuthenticatedUser } from './tools/codespaces/codespace-machines-for-authenticated-user';
import { codespacesCreateForAuthenticatedUser } from './tools/codespaces/create-for-authenticated-user';
import { codespacesCreateOrUpdateOrgSecret } from './tools/codespaces/create-or-update-org-secret';
import { codespacesCreateOrUpdateRepoSecret } from './tools/codespaces/create-or-update-repo-secret';
import { codespacesCreateOrUpdateSecretForAuthenticatedUser } from './tools/codespaces/create-or-update-secret-for-authenticated-user';
import { codespacesCreateWithPrForAuthenticatedUser } from './tools/codespaces/create-with-pr-for-authenticated-user';
import { codespacesCreateWithRepoForAuthenticatedUser } from './tools/codespaces/create-with-repo-for-authenticated-user';
import { codespacesDeleteCodespacesAccessUsers } from './tools/codespaces/delete-codespaces-access-users';
import { codespacesDeleteForAuthenticatedUser } from './tools/codespaces/delete-for-authenticated-user';
import { codespacesDeleteFromOrganization } from './tools/codespaces/delete-from-organization';
import { codespacesDeleteOrgSecret } from './tools/codespaces/delete-org-secret';
import { codespacesDeleteRepoSecret } from './tools/codespaces/delete-repo-secret';
import { codespacesDeleteSecretForAuthenticatedUser } from './tools/codespaces/delete-secret-for-authenticated-user';
import { codespacesExportForAuthenticatedUser } from './tools/codespaces/export-for-authenticated-user';
import { codespacesGetCodespacesForUserInOrg } from './tools/codespaces/get-codespaces-for-user-in-org';
import { codespacesGetExportDetailsForAuthenticatedUser } from './tools/codespaces/get-export-details-for-authenticated-user';
import { codespacesGetForAuthenticatedUser } from './tools/codespaces/get-for-authenticated-user';
import { codespacesGetOrgPublicKey } from './tools/codespaces/get-org-public-key';
import { codespacesGetOrgSecret } from './tools/codespaces/get-org-secret';
import { codespacesGetPublicKeyForAuthenticatedUser } from './tools/codespaces/get-public-key-for-authenticated-user';
import { codespacesGetRepoPublicKey } from './tools/codespaces/get-repo-public-key';
import { codespacesGetRepoSecret } from './tools/codespaces/get-repo-secret';
import { codespacesGetSecretForAuthenticatedUser } from './tools/codespaces/get-secret-for-authenticated-user';
import { codespacesListDevcontainersInRepositoryForAuthenticatedUser } from './tools/codespaces/list-devcontainers-in-repository-for-authenticated-user';
import { codespacesListForAuthenticatedUser } from './tools/codespaces/list-for-authenticated-user';
import { codespacesListInOrganization } from './tools/codespaces/list-in-organization';
import { codespacesListInRepositoryForAuthenticatedUser } from './tools/codespaces/list-in-repository-for-authenticated-user';
import { codespacesListOrgSecrets } from './tools/codespaces/list-org-secrets';
import { codespacesListRepoSecrets } from './tools/codespaces/list-repo-secrets';
import { codespacesListRepositoriesForSecretForAuthenticatedUser } from './tools/codespaces/list-repositories-for-secret-for-authenticated-user';
import { codespacesListSecretsForAuthenticatedUser } from './tools/codespaces/list-secrets-for-authenticated-user';
import { codespacesListSelectedReposForOrgSecret } from './tools/codespaces/list-selected-repos-for-org-secret';
import { codespacesPreFlightWithRepoForAuthenticatedUser } from './tools/codespaces/pre-flight-with-repo-for-authenticated-user';
import { codespacesPublishForAuthenticatedUser } from './tools/codespaces/publish-for-authenticated-user';
import { codespacesRemoveRepositoryForSecretForAuthenticatedUser } from './tools/codespaces/remove-repository-for-secret-for-authenticated-user';
import { codespacesRemoveSelectedRepoFromOrgSecret } from './tools/codespaces/remove-selected-repo-from-org-secret';
import { codespacesRepoMachinesForAuthenticatedUser } from './tools/codespaces/repo-machines-for-authenticated-user';
import { codespacesSetCodespacesAccess } from './tools/codespaces/set-codespaces-access';
import { codespacesSetCodespacesAccessUsers } from './tools/codespaces/set-codespaces-access-users';
import { codespacesSetRepositoriesForSecretForAuthenticatedUser } from './tools/codespaces/set-repositories-for-secret-for-authenticated-user';
import { codespacesSetSelectedReposForOrgSecret } from './tools/codespaces/set-selected-repos-for-org-secret';
import { codespacesStartForAuthenticatedUser } from './tools/codespaces/start-for-authenticated-user';
import { codespacesStopForAuthenticatedUser } from './tools/codespaces/stop-for-authenticated-user';
import { codespacesStopInOrganization } from './tools/codespaces/stop-in-organization';
import { codespacesUpdateForAuthenticatedUser } from './tools/codespaces/update-for-authenticated-user';
import { packagesDeletePackageForAuthenticatedUser } from './tools/packages/delete-package-for-authenticated-user';
import { packagesDeletePackageForOrg } from './tools/packages/delete-package-for-org';
import { packagesDeletePackageForUser } from './tools/packages/delete-package-for-user';
import { packagesDeletePackageVersionForAuthenticatedUser } from './tools/packages/delete-package-version-for-authenticated-user';
import { packagesDeletePackageVersionForOrg } from './tools/packages/delete-package-version-for-org';
import { packagesDeletePackageVersionForUser } from './tools/packages/delete-package-version-for-user';
import { packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser } from './tools/packages/get-all-package-versions-for-package-owned-by-authenticated-user';
import { packagesGetAllPackageVersionsForPackageOwnedByOrg } from './tools/packages/get-all-package-versions-for-package-owned-by-org';
import { packagesGetAllPackageVersionsForPackageOwnedByUser } from './tools/packages/get-all-package-versions-for-package-owned-by-user';
import { packagesGetPackageForAuthenticatedUser } from './tools/packages/get-package-for-authenticated-user';
import { packagesGetPackageForOrganization } from './tools/packages/get-package-for-organization';
import { packagesGetPackageForUser } from './tools/packages/get-package-for-user';
import { packagesGetPackageVersionForAuthenticatedUser } from './tools/packages/get-package-version-for-authenticated-user';
import { packagesGetPackageVersionForOrganization } from './tools/packages/get-package-version-for-organization';
import { packagesGetPackageVersionForUser } from './tools/packages/get-package-version-for-user';
import { packagesListDockerMigrationConflictingPackagesForAuthenticatedUser } from './tools/packages/list-docker-migration-conflicting-packages-for-authenticated-user';
import { packagesListDockerMigrationConflictingPackagesForOrganization } from './tools/packages/list-docker-migration-conflicting-packages-for-organization';
import { packagesListDockerMigrationConflictingPackagesForUser } from './tools/packages/list-docker-migration-conflicting-packages-for-user';
import { packagesListPackagesForAuthenticatedUser } from './tools/packages/list-packages-for-authenticated-user';
import { packagesListPackagesForOrganization } from './tools/packages/list-packages-for-organization';
import { packagesListPackagesForUser } from './tools/packages/list-packages-for-user';
import { packagesRestorePackageForAuthenticatedUser } from './tools/packages/restore-package-for-authenticated-user';
import { packagesRestorePackageForOrg } from './tools/packages/restore-package-for-org';
import { packagesRestorePackageForUser } from './tools/packages/restore-package-for-user';
import { packagesRestorePackageVersionForAuthenticatedUser } from './tools/packages/restore-package-version-for-authenticated-user';
import { packagesRestorePackageVersionForOrg } from './tools/packages/restore-package-version-for-org';
import { packagesRestorePackageVersionForUser } from './tools/packages/restore-package-version-for-user';

export const githubApps = defineGithubServer({
  name: 'github_apps',
  description: 'GitHub REST API: GitHub Apps, packages, codespaces.',
  tools: [
    appsAddRepoToInstallationForAuthenticatedUser,
    appsCheckToken,
    appsCreateFromManifest,
    appsCreateInstallationAccessToken,
    appsDeleteAuthorization,
    appsDeleteInstallation,
    appsDeleteToken,
    appsGetAuthenticated,
    appsGetBySlug,
    appsGetInstallation,
    appsGetOrgInstallation,
    appsGetRepoInstallation,
    appsGetSubscriptionPlanForAccount,
    appsGetSubscriptionPlanForAccountStubbed,
    appsGetUserInstallation,
    appsGetWebhookConfigForApp,
    appsGetWebhookDelivery,
    appsListAccountsForPlan,
    appsListAccountsForPlanStubbed,
    appsListInstallationReposForAuthenticatedUser,
    appsListInstallationRequestsForAuthenticatedApp,
    appsListInstallations,
    appsListInstallationsForAuthenticatedUser,
    appsListPlans,
    appsListPlansStubbed,
    appsListReposAccessibleToInstallation,
    appsListSubscriptionsForAuthenticatedUser,
    appsListSubscriptionsForAuthenticatedUserStubbed,
    appsListWebhookDeliveries,
    appsRedeliverWebhookDelivery,
    appsRemoveRepoFromInstallationForAuthenticatedUser,
    appsResetToken,
    appsRevokeInstallationAccessToken,
    appsScopeToken,
    appsSuspendInstallation,
    appsUnsuspendInstallation,
    appsUpdateWebhookConfigForApp,
    codespacesAddRepositoryForSecretForAuthenticatedUser,
    codespacesAddSelectedRepoToOrgSecret,
    codespacesCheckPermissionsForDevcontainer,
    codespacesCodespaceMachinesForAuthenticatedUser,
    codespacesCreateForAuthenticatedUser,
    codespacesCreateOrUpdateOrgSecret,
    codespacesCreateOrUpdateRepoSecret,
    codespacesCreateOrUpdateSecretForAuthenticatedUser,
    codespacesCreateWithPrForAuthenticatedUser,
    codespacesCreateWithRepoForAuthenticatedUser,
    codespacesDeleteCodespacesAccessUsers,
    codespacesDeleteForAuthenticatedUser,
    codespacesDeleteFromOrganization,
    codespacesDeleteOrgSecret,
    codespacesDeleteRepoSecret,
    codespacesDeleteSecretForAuthenticatedUser,
    codespacesExportForAuthenticatedUser,
    codespacesGetCodespacesForUserInOrg,
    codespacesGetExportDetailsForAuthenticatedUser,
    codespacesGetForAuthenticatedUser,
    codespacesGetOrgPublicKey,
    codespacesGetOrgSecret,
    codespacesGetPublicKeyForAuthenticatedUser,
    codespacesGetRepoPublicKey,
    codespacesGetRepoSecret,
    codespacesGetSecretForAuthenticatedUser,
    codespacesListDevcontainersInRepositoryForAuthenticatedUser,
    codespacesListForAuthenticatedUser,
    codespacesListInOrganization,
    codespacesListInRepositoryForAuthenticatedUser,
    codespacesListOrgSecrets,
    codespacesListRepoSecrets,
    codespacesListRepositoriesForSecretForAuthenticatedUser,
    codespacesListSecretsForAuthenticatedUser,
    codespacesListSelectedReposForOrgSecret,
    codespacesPreFlightWithRepoForAuthenticatedUser,
    codespacesPublishForAuthenticatedUser,
    codespacesRemoveRepositoryForSecretForAuthenticatedUser,
    codespacesRemoveSelectedRepoFromOrgSecret,
    codespacesRepoMachinesForAuthenticatedUser,
    codespacesSetCodespacesAccess,
    codespacesSetCodespacesAccessUsers,
    codespacesSetRepositoriesForSecretForAuthenticatedUser,
    codespacesSetSelectedReposForOrgSecret,
    codespacesStartForAuthenticatedUser,
    codespacesStopForAuthenticatedUser,
    codespacesStopInOrganization,
    codespacesUpdateForAuthenticatedUser,
    packagesDeletePackageForAuthenticatedUser,
    packagesDeletePackageForOrg,
    packagesDeletePackageForUser,
    packagesDeletePackageVersionForAuthenticatedUser,
    packagesDeletePackageVersionForOrg,
    packagesDeletePackageVersionForUser,
    packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser,
    packagesGetAllPackageVersionsForPackageOwnedByOrg,
    packagesGetAllPackageVersionsForPackageOwnedByUser,
    packagesGetPackageForAuthenticatedUser,
    packagesGetPackageForOrganization,
    packagesGetPackageForUser,
    packagesGetPackageVersionForAuthenticatedUser,
    packagesGetPackageVersionForOrganization,
    packagesGetPackageVersionForUser,
    packagesListDockerMigrationConflictingPackagesForAuthenticatedUser,
    packagesListDockerMigrationConflictingPackagesForOrganization,
    packagesListDockerMigrationConflictingPackagesForUser,
    packagesListPackagesForAuthenticatedUser,
    packagesListPackagesForOrganization,
    packagesListPackagesForUser,
    packagesRestorePackageForAuthenticatedUser,
    packagesRestorePackageForOrg,
    packagesRestorePackageForUser,
    packagesRestorePackageVersionForAuthenticatedUser,
    packagesRestorePackageVersionForOrg,
    packagesRestorePackageVersionForUser,
  ],
});
