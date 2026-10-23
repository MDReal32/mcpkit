import { datacenterBackupRestoreCreateBackupSite } from './create-backup-site';
import { datacenterBackupRestoreCreateBackupSpace } from './create-backup-space';
import { datacenterBackupRestoreCreateRestoreSite } from './create-restore-site';
import { datacenterBackupRestoreCreateRestoreSpace } from './create-restore-space';
import { datacenterBackupRestoreGetJobs } from './get-jobs';
import { datacenterBackupRestoreGetJobsByJobId } from './get-jobs-by-job-id';
import { datacenterBackupRestoreGetJobsDownload } from './get-jobs-download';
import { datacenterBackupRestoreGetRestoreFiles } from './get-restore-files';
import { datacenterBackupRestoreUpdateJobsCancel } from './update-jobs-cancel';
import { datacenterBackupRestoreUpdateJobsClearQueue } from './update-jobs-clear-queue';

export const datacenterBackupRestoreTools = [
  datacenterBackupRestoreCreateBackupSite,
  datacenterBackupRestoreCreateBackupSpace,
  datacenterBackupRestoreCreateRestoreSite,
  datacenterBackupRestoreCreateRestoreSpace,
  datacenterBackupRestoreGetJobs,
  datacenterBackupRestoreGetJobsByJobId,
  datacenterBackupRestoreGetJobsDownload,
  datacenterBackupRestoreGetRestoreFiles,
  datacenterBackupRestoreUpdateJobsCancel,
  datacenterBackupRestoreUpdateJobsClearQueue,
];
