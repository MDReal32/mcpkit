import { codeScanningCommitAutofix } from './commit-autofix';
import { codeScanningCreateAutofix } from './create-autofix';
import { codeScanningCreateVariantAnalysis } from './create-variant-analysis';
import { codeScanningDeleteAnalysis } from './delete-analysis';
import { codeScanningDeleteCodeqlDatabase } from './delete-codeql-database';
import { codeScanningGetAiScanEnablement } from './get-ai-scan-enablement';
import { codeScanningGetAiScanEnablementForOrg } from './get-ai-scan-enablement-for-org';
import { codeScanningGetAlert } from './get-alert';
import { codeScanningGetAnalysis } from './get-analysis';
import { codeScanningGetAutofix } from './get-autofix';
import { codeScanningGetCodeqlDatabase } from './get-codeql-database';
import { codeScanningGetDefaultSetup } from './get-default-setup';
import { codeScanningGetSarif } from './get-sarif';
import { codeScanningGetVariantAnalysis } from './get-variant-analysis';
import { codeScanningGetVariantAnalysisRepoTask } from './get-variant-analysis-repo-task';
import { codeScanningListAlertInstances } from './list-alert-instances';
import { codeScanningListAlertsForOrg } from './list-alerts-for-org';
import { codeScanningListAlertsForRepo } from './list-alerts-for-repo';
import { codeScanningListCodeqlDatabases } from './list-codeql-databases';
import { codeScanningListRecentAnalyses } from './list-recent-analyses';
import { codeScanningUpdateAiScanEnablement } from './update-ai-scan-enablement';
import { codeScanningUpdateAiScanEnablementForOrg } from './update-ai-scan-enablement-for-org';
import { codeScanningUpdateAlert } from './update-alert';
import { codeScanningUpdateDefaultSetup } from './update-default-setup';
import { codeScanningUploadSarif } from './upload-sarif';

export const codeScanningTools = [
  codeScanningCommitAutofix,
  codeScanningCreateAutofix,
  codeScanningCreateVariantAnalysis,
  codeScanningDeleteAnalysis,
  codeScanningDeleteCodeqlDatabase,
  codeScanningGetAiScanEnablement,
  codeScanningGetAiScanEnablementForOrg,
  codeScanningGetAlert,
  codeScanningGetAnalysis,
  codeScanningGetAutofix,
  codeScanningGetCodeqlDatabase,
  codeScanningGetDefaultSetup,
  codeScanningGetSarif,
  codeScanningGetVariantAnalysis,
  codeScanningGetVariantAnalysisRepoTask,
  codeScanningListAlertInstances,
  codeScanningListAlertsForOrg,
  codeScanningListAlertsForRepo,
  codeScanningListCodeqlDatabases,
  codeScanningListRecentAnalyses,
  codeScanningUpdateAiScanEnablement,
  codeScanningUpdateAiScanEnablementForOrg,
  codeScanningUpdateAlert,
  codeScanningUpdateDefaultSetup,
  codeScanningUploadSarif,
];
