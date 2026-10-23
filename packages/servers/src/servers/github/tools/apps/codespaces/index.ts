import { appsCodespacesAddRepositoryForSecretForAuthenticatedUser } from './add-repository-for-secret-for-authenticated-user';
import { appsCodespacesAddSelectedRepoToOrgSecret } from './add-selected-repo-to-org-secret';
import { appsCodespacesCheckPermissionsForDevcontainer } from './check-permissions-for-devcontainer';
import { appsCodespacesCodespaceMachinesForAuthenticatedUser } from './codespace-machines-for-authenticated-user';
import { appsCodespacesCreateForAuthenticatedUser } from './create-for-authenticated-user';
import { appsCodespacesCreateOrUpdateOrgSecret } from './create-or-update-org-secret';
import { appsCodespacesCreateOrUpdateRepoSecret } from './create-or-update-repo-secret';
import { appsCodespacesCreateOrUpdateSecretForAuthenticatedUser } from './create-or-update-secret-for-authenticated-user';
import { appsCodespacesCreateWithPrForAuthenticatedUser } from './create-with-pr-for-authenticated-user';
import { appsCodespacesCreateWithRepoForAuthenticatedUser } from './create-with-repo-for-authenticated-user';
import { appsCodespacesDeleteCodespacesAccessUsers } from './delete-codespaces-access-users';
import { appsCodespacesDeleteForAuthenticatedUser } from './delete-for-authenticated-user';
import { appsCodespacesDeleteFromOrganization } from './delete-from-organization';
import { appsCodespacesDeleteOrgSecret } from './delete-org-secret';
import { appsCodespacesDeleteRepoSecret } from './delete-repo-secret';
import { appsCodespacesDeleteSecretForAuthenticatedUser } from './delete-secret-for-authenticated-user';
import { appsCodespacesExportForAuthenticatedUser } from './export-for-authenticated-user';
import { appsCodespacesGetCodespacesForUserInOrg } from './get-codespaces-for-user-in-org';
import { appsCodespacesGetExportDetailsForAuthenticatedUser } from './get-export-details-for-authenticated-user';
import { appsCodespacesGetForAuthenticatedUser } from './get-for-authenticated-user';
import { appsCodespacesGetOrgPublicKey } from './get-org-public-key';
import { appsCodespacesGetOrgSecret } from './get-org-secret';
import { appsCodespacesGetPublicKeyForAuthenticatedUser } from './get-public-key-for-authenticated-user';
import { appsCodespacesGetRepoPublicKey } from './get-repo-public-key';
import { appsCodespacesGetRepoSecret } from './get-repo-secret';
import { appsCodespacesGetSecretForAuthenticatedUser } from './get-secret-for-authenticated-user';
import { appsCodespacesListDevcontainersInRepositoryForAuthenticatedUser } from './list-devcontainers-in-repository-for-authenticated-user';
import { appsCodespacesListForAuthenticatedUser } from './list-for-authenticated-user';
import { appsCodespacesListInOrganization } from './list-in-organization';
import { appsCodespacesListInRepositoryForAuthenticatedUser } from './list-in-repository-for-authenticated-user';
import { appsCodespacesListOrgSecrets } from './list-org-secrets';
import { appsCodespacesListRepoSecrets } from './list-repo-secrets';
import { appsCodespacesListRepositoriesForSecretForAuthenticatedUser } from './list-repositories-for-secret-for-authenticated-user';
import { appsCodespacesListSecretsForAuthenticatedUser } from './list-secrets-for-authenticated-user';
import { appsCodespacesListSelectedReposForOrgSecret } from './list-selected-repos-for-org-secret';
import { appsCodespacesPreFlightWithRepoForAuthenticatedUser } from './pre-flight-with-repo-for-authenticated-user';
import { appsCodespacesPublishForAuthenticatedUser } from './publish-for-authenticated-user';
import { appsCodespacesRemoveRepositoryForSecretForAuthenticatedUser } from './remove-repository-for-secret-for-authenticated-user';
import { appsCodespacesRemoveSelectedRepoFromOrgSecret } from './remove-selected-repo-from-org-secret';
import { appsCodespacesRepoMachinesForAuthenticatedUser } from './repo-machines-for-authenticated-user';
import { appsCodespacesSetCodespacesAccess } from './set-codespaces-access';
import { appsCodespacesSetCodespacesAccessUsers } from './set-codespaces-access-users';
import { appsCodespacesSetRepositoriesForSecretForAuthenticatedUser } from './set-repositories-for-secret-for-authenticated-user';
import { appsCodespacesSetSelectedReposForOrgSecret } from './set-selected-repos-for-org-secret';
import { appsCodespacesStartForAuthenticatedUser } from './start-for-authenticated-user';
import { appsCodespacesStopForAuthenticatedUser } from './stop-for-authenticated-user';
import { appsCodespacesStopInOrganization } from './stop-in-organization';
import { appsCodespacesUpdateForAuthenticatedUser } from './update-for-authenticated-user';

export const appsCodespacesTools = [
  appsCodespacesAddRepositoryForSecretForAuthenticatedUser,
  appsCodespacesAddSelectedRepoToOrgSecret,
  appsCodespacesCheckPermissionsForDevcontainer,
  appsCodespacesCodespaceMachinesForAuthenticatedUser,
  appsCodespacesCreateForAuthenticatedUser,
  appsCodespacesCreateOrUpdateOrgSecret,
  appsCodespacesCreateOrUpdateRepoSecret,
  appsCodespacesCreateOrUpdateSecretForAuthenticatedUser,
  appsCodespacesCreateWithPrForAuthenticatedUser,
  appsCodespacesCreateWithRepoForAuthenticatedUser,
  appsCodespacesDeleteCodespacesAccessUsers,
  appsCodespacesDeleteForAuthenticatedUser,
  appsCodespacesDeleteFromOrganization,
  appsCodespacesDeleteOrgSecret,
  appsCodespacesDeleteRepoSecret,
  appsCodespacesDeleteSecretForAuthenticatedUser,
  appsCodespacesExportForAuthenticatedUser,
  appsCodespacesGetCodespacesForUserInOrg,
  appsCodespacesGetExportDetailsForAuthenticatedUser,
  appsCodespacesGetForAuthenticatedUser,
  appsCodespacesGetOrgPublicKey,
  appsCodespacesGetOrgSecret,
  appsCodespacesGetPublicKeyForAuthenticatedUser,
  appsCodespacesGetRepoPublicKey,
  appsCodespacesGetRepoSecret,
  appsCodespacesGetSecretForAuthenticatedUser,
  appsCodespacesListDevcontainersInRepositoryForAuthenticatedUser,
  appsCodespacesListForAuthenticatedUser,
  appsCodespacesListInOrganization,
  appsCodespacesListInRepositoryForAuthenticatedUser,
  appsCodespacesListOrgSecrets,
  appsCodespacesListRepoSecrets,
  appsCodespacesListRepositoriesForSecretForAuthenticatedUser,
  appsCodespacesListSecretsForAuthenticatedUser,
  appsCodespacesListSelectedReposForOrgSecret,
  appsCodespacesPreFlightWithRepoForAuthenticatedUser,
  appsCodespacesPublishForAuthenticatedUser,
  appsCodespacesRemoveRepositoryForSecretForAuthenticatedUser,
  appsCodespacesRemoveSelectedRepoFromOrgSecret,
  appsCodespacesRepoMachinesForAuthenticatedUser,
  appsCodespacesSetCodespacesAccess,
  appsCodespacesSetCodespacesAccessUsers,
  appsCodespacesSetRepositoriesForSecretForAuthenticatedUser,
  appsCodespacesSetSelectedReposForOrgSecret,
  appsCodespacesStartForAuthenticatedUser,
  appsCodespacesStopForAuthenticatedUser,
  appsCodespacesStopInOrganization,
  appsCodespacesUpdateForAuthenticatedUser,
];
