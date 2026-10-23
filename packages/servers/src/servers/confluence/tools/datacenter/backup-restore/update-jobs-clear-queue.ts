import { defineTool } from '@usemcpkit/core';

export const datacenterBackupRestoreUpdateJobsClearQueue = defineTool({
  name: 'datacenter:backup_restore:update_jobs_clear_queue',
  description:
    '[Data Center] Cancel all queued jobs. Cancels all queued jobs. Does not affect jobs that are being processed at the moment.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'PUT',
    path: '/rest/api/backup-restore/jobs/clear-queue',
  },
});
