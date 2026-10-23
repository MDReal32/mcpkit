import { secretScanningBulkCreateOrgCustomPatterns } from './bulk-create-org-custom-patterns';
import { secretScanningBulkCreateRepoCustomPatterns } from './bulk-create-repo-custom-patterns';
import { secretScanningBulkDeleteOrgCustomPatterns } from './bulk-delete-org-custom-patterns';
import { secretScanningBulkDeleteRepoCustomPatterns } from './bulk-delete-repo-custom-patterns';
import { secretScanningCreatePushProtectionBypass } from './create-push-protection-bypass';
import { secretScanningGetAlert } from './get-alert';
import { secretScanningGetScanHistory } from './get-scan-history';
import { secretScanningListAlertsForOrg } from './list-alerts-for-org';
import { secretScanningListAlertsForRepo } from './list-alerts-for-repo';
import { secretScanningListLocationsForAlert } from './list-locations-for-alert';
import { secretScanningListOrgCustomPatterns } from './list-org-custom-patterns';
import { secretScanningListOrgPatternConfigs } from './list-org-pattern-configs';
import { secretScanningListRepoCustomPatterns } from './list-repo-custom-patterns';
import { secretScanningUpdateAlert } from './update-alert';
import { secretScanningUpdateOrgCustomPattern } from './update-org-custom-pattern';
import { secretScanningUpdateOrgPatternConfigs } from './update-org-pattern-configs';
import { secretScanningUpdateRepoCustomPattern } from './update-repo-custom-pattern';

export const secretScanningTools = [
  secretScanningBulkCreateOrgCustomPatterns,
  secretScanningBulkCreateRepoCustomPatterns,
  secretScanningBulkDeleteOrgCustomPatterns,
  secretScanningBulkDeleteRepoCustomPatterns,
  secretScanningCreatePushProtectionBypass,
  secretScanningGetAlert,
  secretScanningGetScanHistory,
  secretScanningListAlertsForOrg,
  secretScanningListAlertsForRepo,
  secretScanningListLocationsForAlert,
  secretScanningListOrgCustomPatterns,
  secretScanningListOrgPatternConfigs,
  secretScanningListRepoCustomPatterns,
  secretScanningUpdateAlert,
  secretScanningUpdateOrgCustomPattern,
  secretScanningUpdateOrgPatternConfigs,
  secretScanningUpdateRepoCustomPattern,
];
