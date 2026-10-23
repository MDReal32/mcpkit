import { datacenterBackupRestoreCreateBackupSite } from "./create-backup-site";
import { datacenterBackupRestoreCreateBackupSpace } from "./create-backup-space";
import { datacenterBackupRestoreCreateRestoreSite } from "./create-restore-site";
import { datacenterBackupRestoreCreateRestoreSiteUpload } from "./create-restore-site-upload";
import { datacenterBackupRestoreCreateRestoreSpace } from "./create-restore-space";
import { datacenterBackupRestoreCreateRestoreSpaceUpload } from "./create-restore-space-upload";
import { datacenterBackupRestoreGetJobs } from "./get-jobs";
import { datacenterBackupRestoreGetJobsByJobId } from "./get-jobs-by-job-id";
import { datacenterBackupRestoreGetJobsDownload } from "./get-jobs-download";
import { datacenterBackupRestoreGetRestoreFiles } from "./get-restore-files";
import { datacenterBackupRestoreUpdateJobsCancel } from "./update-jobs-cancel";
import { datacenterBackupRestoreUpdateJobsClearQueue } from "./update-jobs-clear-queue";

export const datacenterBackupRestoreTools = [
  datacenterBackupRestoreCreateBackupSite,
  datacenterBackupRestoreCreateBackupSpace,
  datacenterBackupRestoreCreateRestoreSite,
  datacenterBackupRestoreCreateRestoreSiteUpload,
  datacenterBackupRestoreCreateRestoreSpace,
  datacenterBackupRestoreCreateRestoreSpaceUpload,
  datacenterBackupRestoreGetJobs,
  datacenterBackupRestoreGetJobsByJobId,
  datacenterBackupRestoreGetJobsDownload,
  datacenterBackupRestoreGetRestoreFiles,
  datacenterBackupRestoreUpdateJobsCancel,
  datacenterBackupRestoreUpdateJobsClearQueue,
];
