import { dependabotAddSelectedRepoToOrgSecret } from './add-selected-repo-to-org-secret';
import { dependabotCreateOrUpdateOrgSecret } from './create-or-update-org-secret';
import { dependabotCreateOrUpdateRepoSecret } from './create-or-update-repo-secret';
import { dependabotDeleteOrgSecret } from './delete-org-secret';
import { dependabotDeleteRepoSecret } from './delete-repo-secret';
import { dependabotGetAlert } from './get-alert';
import { dependabotGetOrgPublicKey } from './get-org-public-key';
import { dependabotGetOrgSecret } from './get-org-secret';
import { dependabotGetRepoPublicKey } from './get-repo-public-key';
import { dependabotGetRepoSecret } from './get-repo-secret';
import { dependabotListAlertsForEnterprise } from './list-alerts-for-enterprise';
import { dependabotListAlertsForOrg } from './list-alerts-for-org';
import { dependabotListAlertsForRepo } from './list-alerts-for-repo';
import { dependabotListOrgSecrets } from './list-org-secrets';
import { dependabotListRepoSecrets } from './list-repo-secrets';
import { dependabotListSelectedReposForOrgSecret } from './list-selected-repos-for-org-secret';
import { dependabotRemoveSelectedRepoFromOrgSecret } from './remove-selected-repo-from-org-secret';
import { dependabotRepositoryAccessForEnterprise } from './repository-access-for-enterprise';
import { dependabotRepositoryAccessForOrg } from './repository-access-for-org';
import { dependabotSetRepositoryAccessDefaultLevel } from './set-repository-access-default-level';
import { dependabotSetRepositoryAccessDefaultLevelForEnterprise } from './set-repository-access-default-level-for-enterprise';
import { dependabotSetSelectedReposForOrgSecret } from './set-selected-repos-for-org-secret';
import { dependabotUpdateAlert } from './update-alert';
import { dependabotUpdateRepositoryAccessForEnterprise } from './update-repository-access-for-enterprise';
import { dependabotUpdateRepositoryAccessForOrg } from './update-repository-access-for-org';

export const dependabotTools = [
  dependabotAddSelectedRepoToOrgSecret,
  dependabotCreateOrUpdateOrgSecret,
  dependabotCreateOrUpdateRepoSecret,
  dependabotDeleteOrgSecret,
  dependabotDeleteRepoSecret,
  dependabotGetAlert,
  dependabotGetOrgPublicKey,
  dependabotGetOrgSecret,
  dependabotGetRepoPublicKey,
  dependabotGetRepoSecret,
  dependabotListAlertsForEnterprise,
  dependabotListAlertsForOrg,
  dependabotListAlertsForRepo,
  dependabotListOrgSecrets,
  dependabotListRepoSecrets,
  dependabotListSelectedReposForOrgSecret,
  dependabotRemoveSelectedRepoFromOrgSecret,
  dependabotRepositoryAccessForEnterprise,
  dependabotRepositoryAccessForOrg,
  dependabotSetRepositoryAccessDefaultLevel,
  dependabotSetRepositoryAccessDefaultLevelForEnterprise,
  dependabotSetSelectedReposForOrgSecret,
  dependabotUpdateAlert,
  dependabotUpdateRepositoryAccessForEnterprise,
  dependabotUpdateRepositoryAccessForOrg,
];
