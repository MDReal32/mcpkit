import { securitySecretScanningBulkCreateOrgCustomPatterns } from "./bulk-create-org-custom-patterns";
import { securitySecretScanningBulkCreateRepoCustomPatterns } from "./bulk-create-repo-custom-patterns";
import { securitySecretScanningBulkDeleteOrgCustomPatterns } from "./bulk-delete-org-custom-patterns";
import { securitySecretScanningBulkDeleteRepoCustomPatterns } from "./bulk-delete-repo-custom-patterns";
import { securitySecretScanningCreatePushProtectionBypass } from "./create-push-protection-bypass";
import { securitySecretScanningGetAlert } from "./get-alert";
import { securitySecretScanningGetScanHistory } from "./get-scan-history";
import { securitySecretScanningListAlertsForOrg } from "./list-alerts-for-org";
import { securitySecretScanningListAlertsForRepo } from "./list-alerts-for-repo";
import { securitySecretScanningListLocationsForAlert } from "./list-locations-for-alert";
import { securitySecretScanningListOrgCustomPatterns } from "./list-org-custom-patterns";
import { securitySecretScanningListOrgPatternConfigs } from "./list-org-pattern-configs";
import { securitySecretScanningListRepoCustomPatterns } from "./list-repo-custom-patterns";
import { securitySecretScanningUpdateAlert } from "./update-alert";
import { securitySecretScanningUpdateOrgCustomPattern } from "./update-org-custom-pattern";
import { securitySecretScanningUpdateOrgPatternConfigs } from "./update-org-pattern-configs";
import { securitySecretScanningUpdateRepoCustomPattern } from "./update-repo-custom-pattern";

export const securitySecretScanningTools = [
  securitySecretScanningBulkCreateOrgCustomPatterns,
  securitySecretScanningBulkCreateRepoCustomPatterns,
  securitySecretScanningBulkDeleteOrgCustomPatterns,
  securitySecretScanningBulkDeleteRepoCustomPatterns,
  securitySecretScanningCreatePushProtectionBypass,
  securitySecretScanningGetAlert,
  securitySecretScanningGetScanHistory,
  securitySecretScanningListAlertsForOrg,
  securitySecretScanningListAlertsForRepo,
  securitySecretScanningListLocationsForAlert,
  securitySecretScanningListOrgCustomPatterns,
  securitySecretScanningListOrgPatternConfigs,
  securitySecretScanningListRepoCustomPatterns,
  securitySecretScanningUpdateAlert,
  securitySecretScanningUpdateOrgCustomPattern,
  securitySecretScanningUpdateOrgPatternConfigs,
  securitySecretScanningUpdateRepoCustomPattern,
];
