import { securityDependabotAddSelectedRepoToOrgSecret } from "./add-selected-repo-to-org-secret";
import { securityDependabotCreateOrUpdateOrgSecret } from "./create-or-update-org-secret";
import { securityDependabotCreateOrUpdateRepoSecret } from "./create-or-update-repo-secret";
import { securityDependabotDeleteOrgSecret } from "./delete-org-secret";
import { securityDependabotDeleteRepoSecret } from "./delete-repo-secret";
import { securityDependabotGetAlert } from "./get-alert";
import { securityDependabotGetOrgPublicKey } from "./get-org-public-key";
import { securityDependabotGetOrgSecret } from "./get-org-secret";
import { securityDependabotGetRepoPublicKey } from "./get-repo-public-key";
import { securityDependabotGetRepoSecret } from "./get-repo-secret";
import { securityDependabotListAlertsForEnterprise } from "./list-alerts-for-enterprise";
import { securityDependabotListAlertsForOrg } from "./list-alerts-for-org";
import { securityDependabotListAlertsForRepo } from "./list-alerts-for-repo";
import { securityDependabotListOrgSecrets } from "./list-org-secrets";
import { securityDependabotListRepoSecrets } from "./list-repo-secrets";
import { securityDependabotListSelectedReposForOrgSecret } from "./list-selected-repos-for-org-secret";
import { securityDependabotRemoveSelectedRepoFromOrgSecret } from "./remove-selected-repo-from-org-secret";
import { securityDependabotRepositoryAccessForEnterprise } from "./repository-access-for-enterprise";
import { securityDependabotRepositoryAccessForOrg } from "./repository-access-for-org";
import { securityDependabotSetRepositoryAccessDefaultLevel } from "./set-repository-access-default-level";
import { securityDependabotSetRepositoryAccessDefaultLevelForEnterprise } from "./set-repository-access-default-level-for-enterprise";
import { securityDependabotSetSelectedReposForOrgSecret } from "./set-selected-repos-for-org-secret";
import { securityDependabotUpdateAlert } from "./update-alert";
import { securityDependabotUpdateRepositoryAccessForEnterprise } from "./update-repository-access-for-enterprise";
import { securityDependabotUpdateRepositoryAccessForOrg } from "./update-repository-access-for-org";

export const securityDependabotTools = [
  securityDependabotAddSelectedRepoToOrgSecret,
  securityDependabotCreateOrUpdateOrgSecret,
  securityDependabotCreateOrUpdateRepoSecret,
  securityDependabotDeleteOrgSecret,
  securityDependabotDeleteRepoSecret,
  securityDependabotGetAlert,
  securityDependabotGetOrgPublicKey,
  securityDependabotGetOrgSecret,
  securityDependabotGetRepoPublicKey,
  securityDependabotGetRepoSecret,
  securityDependabotListAlertsForEnterprise,
  securityDependabotListAlertsForOrg,
  securityDependabotListAlertsForRepo,
  securityDependabotListOrgSecrets,
  securityDependabotListRepoSecrets,
  securityDependabotListSelectedReposForOrgSecret,
  securityDependabotRemoveSelectedRepoFromOrgSecret,
  securityDependabotRepositoryAccessForEnterprise,
  securityDependabotRepositoryAccessForOrg,
  securityDependabotSetRepositoryAccessDefaultLevel,
  securityDependabotSetRepositoryAccessDefaultLevelForEnterprise,
  securityDependabotSetSelectedReposForOrgSecret,
  securityDependabotUpdateAlert,
  securityDependabotUpdateRepositoryAccessForEnterprise,
  securityDependabotUpdateRepositoryAccessForOrg,
];
