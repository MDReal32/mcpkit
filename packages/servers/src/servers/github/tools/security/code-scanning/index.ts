import { securityCodeScanningCommitAutofix } from './commit-autofix';
import { securityCodeScanningCreateAutofix } from './create-autofix';
import { securityCodeScanningCreateVariantAnalysis } from './create-variant-analysis';
import { securityCodeScanningDeleteAnalysis } from './delete-analysis';
import { securityCodeScanningDeleteCodeqlDatabase } from './delete-codeql-database';
import { securityCodeScanningGetAiScanEnablement } from './get-ai-scan-enablement';
import { securityCodeScanningGetAiScanEnablementForOrg } from './get-ai-scan-enablement-for-org';
import { securityCodeScanningGetAlert } from './get-alert';
import { securityCodeScanningGetAnalysis } from './get-analysis';
import { securityCodeScanningGetAutofix } from './get-autofix';
import { securityCodeScanningGetCodeqlDatabase } from './get-codeql-database';
import { securityCodeScanningGetDefaultSetup } from './get-default-setup';
import { securityCodeScanningGetSarif } from './get-sarif';
import { securityCodeScanningGetVariantAnalysis } from './get-variant-analysis';
import { securityCodeScanningGetVariantAnalysisRepoTask } from './get-variant-analysis-repo-task';
import { securityCodeScanningListAlertInstances } from './list-alert-instances';
import { securityCodeScanningListAlertsForOrg } from './list-alerts-for-org';
import { securityCodeScanningListAlertsForRepo } from './list-alerts-for-repo';
import { securityCodeScanningListCodeqlDatabases } from './list-codeql-databases';
import { securityCodeScanningListRecentAnalyses } from './list-recent-analyses';
import { securityCodeScanningUpdateAiScanEnablement } from './update-ai-scan-enablement';
import { securityCodeScanningUpdateAiScanEnablementForOrg } from './update-ai-scan-enablement-for-org';
import { securityCodeScanningUpdateAlert } from './update-alert';
import { securityCodeScanningUpdateDefaultSetup } from './update-default-setup';
import { securityCodeScanningUploadSarif } from './upload-sarif';

export const securityCodeScanningTools = [
  securityCodeScanningCommitAutofix,
  securityCodeScanningCreateAutofix,
  securityCodeScanningCreateVariantAnalysis,
  securityCodeScanningDeleteAnalysis,
  securityCodeScanningDeleteCodeqlDatabase,
  securityCodeScanningGetAiScanEnablement,
  securityCodeScanningGetAiScanEnablementForOrg,
  securityCodeScanningGetAlert,
  securityCodeScanningGetAnalysis,
  securityCodeScanningGetAutofix,
  securityCodeScanningGetCodeqlDatabase,
  securityCodeScanningGetDefaultSetup,
  securityCodeScanningGetSarif,
  securityCodeScanningGetVariantAnalysis,
  securityCodeScanningGetVariantAnalysisRepoTask,
  securityCodeScanningListAlertInstances,
  securityCodeScanningListAlertsForOrg,
  securityCodeScanningListAlertsForRepo,
  securityCodeScanningListCodeqlDatabases,
  securityCodeScanningListRecentAnalyses,
  securityCodeScanningUpdateAiScanEnablement,
  securityCodeScanningUpdateAiScanEnablementForOrg,
  securityCodeScanningUpdateAlert,
  securityCodeScanningUpdateDefaultSetup,
  securityCodeScanningUploadSarif,
];
